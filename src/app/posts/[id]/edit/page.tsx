import type { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Edit Post ${id} - Blog App`,
    description: `Edit your blog post`,
  };
}

export default async function EditPostPage({ params }: Props) {
  const { id } = await params;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Post</h1>
      <p className="text-muted-foreground">Editing post ID: {id}</p>
      {/* Post editor will be added here */}
    </div>
  );
}
