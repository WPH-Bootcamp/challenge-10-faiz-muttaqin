import type { Metadata } from "next";

type Props = {
  params: Promise<{ username: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { username } = await params;
  return {
    title: `@${username} - Blog App`,
    description: `View ${username}'s profile`,
  };
}

export default async function UserProfilePage({ params }: Props) {
  const { username } = await params;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">@{username}</h1>
      {/* User profile and posts will be displayed here */}
    </div>
  );
}
