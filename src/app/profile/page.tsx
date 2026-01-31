"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getMyProfile, getMyPosts, updateProfile } from "@/lib/api";
import { getAuthToken } from "@/lib/auth";
import type { Post, User } from "@/types/blog";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Textarea } from "@/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/ui/dialog";
import { Label } from "@/ui/label";
import { PostCard } from "@/components/post-card";
import { LoadingSpinner } from "@/components/loading-spinner";
import { Alert, AlertDescription } from "@/ui/alert";
import { AlertCircle, Edit, Mail } from "lucide-react";

export default function MyProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState("");
  const [editForm, setEditForm] = useState({
    username: "",
    bio: "",
    avatar: "",
  });

  const token = getAuthToken();

  useEffect(() => {
    if (!token) {
      router.push("/login");
      return;
    }

    Promise.all([getMyProfile(token), getMyPosts(token)])
      .then(([userData, postsData]) => {
        setUser(userData);
        setPosts(postsData);
        setEditForm({
          username: userData.username,
          bio: userData.bio || "",
          avatar: userData.avatar || "",
        });
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Failed to load profile");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token, router]);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setEditing(true);
    try {
      const updated = await updateProfile(editForm, token);
      setUser(updated);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update profile");
    } finally {
      setEditing(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error && !user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.avatar} alt={user.username} />
                <AvatarFallback className="text-2xl">
                  {user.username.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">@{user.username}</h1>
                    {user.email && (
                      <p className="text-muted-foreground flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        {user.email}
                      </p>
                    )}
                  </div>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Profile
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleUpdateProfile} className="space-y-4">
                        {error && (
                          <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                          </Alert>
                        )}

                        <div className="space-y-2">
                          <Label htmlFor="username">Username</Label>
                          <Input
                            id="username"
                            value={editForm.username}
                            onChange={(e) =>
                              setEditForm({ ...editForm, username: e.target.value })
                            }
                            disabled={editing}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="bio">Bio</Label>
                          <Textarea
                            id="bio"
                            value={editForm.bio}
                            onChange={(e) =>
                              setEditForm({ ...editForm, bio: e.target.value })
                            }
                            rows={4}
                            disabled={editing}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="avatar">Avatar URL</Label>
                          <Input
                            id="avatar"
                            type="url"
                            value={editForm.avatar}
                            onChange={(e) =>
                              setEditForm({ ...editForm, avatar: e.target.value })
                            }
                            disabled={editing}
                          />
                        </div>

                        <Button type="submit" className="w-full" disabled={editing}>
                          {editing ? "Saving..." : "Save Changes"}
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>

                {user.bio && (
                  <p className="text-muted-foreground mb-4">{user.bio}</p>
                )}

                <div className="flex gap-4 text-sm">
                  <div>
                    <span className="font-semibold">{posts.length}</span>{" "}
                    <span className="text-muted-foreground">posts</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Posts Section */}
        <Card>
          <CardHeader>
            <CardTitle>My Posts</CardTitle>
          </CardHeader>
          <CardContent>
            {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">
                  You haven&apos;t written any posts yet.
                </p>
                <Button asChild>
                  <Link href="/posts/write">Write your first post</Link>
                </Button>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
