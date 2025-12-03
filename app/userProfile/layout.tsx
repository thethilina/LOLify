// app/userProfile/layout.tsx
"use client";

import UserHeader from "@/app/userProfile/User/UserHeader";



export default function UserProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Header common to all user profile pages */}
      <UserHeader />

      {/* Main content */}
      <main className="px-6 mt-6">{children}</main>
    </div>
  );
}
