import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Blog App",
  description: "Login to your account",
};

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-6">Login</h1>
        {/* Login form will be added here */}
      </div>
    </div>
  );
}
