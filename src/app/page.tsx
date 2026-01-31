"use client";

import { useEffect, useState } from "react";
import { getRecommendedPosts, getMostLikedPosts } from "@/lib/api";
import type { Post } from "@/types/blog";
import { PostCard } from "@/components/post-card";
import { LoadingSpinner } from "@/components/loading-spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import { Alert, AlertDescription } from "@/ui/alert";
import { AlertCircle } from "lucide-react";

export default function Home() {
  const [recommendedPosts, setRecommendedPosts] = useState<Post[]>([]);
  const [mostLikedPosts, setMostLikedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      getRecommendedPosts().catch(() => []),
      getMostLikedPosts().catch(() => []),
    ])
      .then(([recommended, liked]) => {
        setRecommendedPosts(recommended);
        setMostLikedPosts(liked);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : "Failed to load posts");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">
            Discover stories, thinking, and expertise
          </h1>
          <p className="text-muted-foreground text-lg">
            Read and share ideas from independent writers and experts
          </p>
        </div>

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="recommended" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
            <TabsTrigger value="most-liked">Most Liked</TabsTrigger>
          </TabsList>

          <TabsContent value="recommended">
            {loading ? (
              <LoadingSpinner />
            ) : recommendedPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No posts available yet.</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {recommendedPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="most-liked">
            {loading ? (
              <LoadingSpinner />
            ) : mostLikedPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No posts available yet.</p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {mostLikedPosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
