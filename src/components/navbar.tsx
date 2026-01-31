"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAuthToken, removeAuthToken } from "@/lib/auth";
import { getMyProfile } from "@/lib/api";
import type { User } from "@/types/blog";
import { Button } from "@/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/ui/dropdown-menu";
import { Input } from "@/ui/input";
import { Search, PenSquare, LogOut, User as UserIcon } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const token = getAuthToken();
        if (token) {
            getMyProfile(token)
                .then(setUser)
                .catch(() => setUser(null));
        }
    }, []);

    const handleLogout = () => {
        removeAuthToken();
        setUser(null);
        router.push("/");
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <div className="flex items-center gap-6">
                    <Link href="/" className="text-2xl font-bold">
                        Blog<span className="text-primary">.</span>
                    </Link>

                    <form onSubmit={handleSearch} className="hidden md:block">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                type="search"
                                placeholder="Search posts..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-64 pl-10"
                            />
                        </div>
                    </form>
                </div>

                <div className="flex items-center gap-4">
                    <ThemeToggle />
                    
                    {user ? (
                        <>
                            <Button asChild variant="ghost" size="sm">
                                <Link href="/posts/write">
                                    <PenSquare className="mr-2 h-4 w-4" />
                                    Write
                                </Link>
                            </Button>

                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                                        <Avatar className="h-10 w-10">
                                            <AvatarImage src={user.avatar} alt={user.username} />
                                            <AvatarFallback>
                                                {user.username.slice(0, 2).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem asChild>
                                        <Link href="/profile">
                                            <UserIcon className="mr-2 h-4 w-4" />
                                            My Profile
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={handleLogout}>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Logout
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        <>
                            <Button asChild variant="ghost" size="sm">
                                <Link href="/login">Login</Link>
                            </Button>
                            <Button asChild size="sm">
                                <Link href="/register">Register</Link>
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
