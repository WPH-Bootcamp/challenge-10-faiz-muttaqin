import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search - Blog App",
  description: "Search for blog posts",
};

export default function SearchPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Search Posts</h1>
      {/* Search functionality will be added here */}
    </div>
  );
}
