import type { Metadata } from "next";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return {
    title: `Post ${id} - Blog App`,
    description: `View post details`,
  };
}

export default async function PostDetailPage({ params }: Props) {
  const { id } = await params;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Post Detail</h1>
      <p className="text-muted-foreground">Post ID: {id}</p>
      {/* Post detail will be displayed here */}
    </div>
  );
}
