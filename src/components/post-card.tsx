"use client";

import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import type { Post } from "@/types/blog";
import { Card, CardContent, CardFooter, CardHeader } from "@/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { Badge } from "@/ui/badge";
import { Heart, MessageCircle } from "lucide-react";

interface PostCardProps {
    post: Post;
}

export function PostCard({ post }: PostCardProps) {
    return (
        <Card className="overflow-hidden transition-shadow hover:shadow-lg">
            <Link href={`/posts/${post.id}`}>
                {post.coverImage && (
                    <div className="relative aspect-video w-full overflow-hidden">
                        <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform hover:scale-105"
                        />
                    </div>
                )}
            </Link>

            <CardHeader>
                <Link
                    href={`/posts/${post.id}`}
                    className="group"
                >
                    <h3 className="line-clamp-2 text-2xl font-bold group-hover:text-primary">
                        {post.title}
                    </h3>
                </Link>
                {post.excerpt && (
                    <p className="mt-2 line-clamp-3 text-muted-foreground">
                        {post.excerpt}
                    </p>
                )}
            </CardHeader>

            <CardContent>
                {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                )}
            </CardContent>

            <CardFooter className="flex items-center justify-between">
                <Link
                    href={`/profile/${post.author.username}`}
                    className="flex items-center gap-3 hover:opacity-80"
                >
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={post.author.avatar} alt={post.author.username} />
                        <AvatarFallback>
                            {post.author.username.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                        <span className="text-sm font-medium">{post.author.username}</span>
                        <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                        </span>
                    </div>
                </Link>

                <div className="flex items-center gap-4 text-muted-foreground">
                    <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        <span className="text-sm">{post.likesCount}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        <span className="text-sm">{post.commentsCount}</span>
                    </div>
                </div>
            </CardFooter>
        </Card>
    );
}
