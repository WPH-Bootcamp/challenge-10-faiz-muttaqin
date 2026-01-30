import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register - Blog App",
  description: "Create a new account",
};

export default function RegisterPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-6">Register</h1>
        {/* Register form will be added here */}
      </div>
    </div>
  );
}
