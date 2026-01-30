import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile - Blog App",
  description: "Manage your profile",
};

export default function MyProfilePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      {/* User's own profile management will be displayed here */}
    </div>
  );
}
