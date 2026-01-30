import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Write Post - Blog App",
  description: "Create a new blog post",
};

export default function WritePostPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Write Post</h1>
      {/* Post editor will be added here */}
    </div>
  );
}
