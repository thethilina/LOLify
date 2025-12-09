// app/userProfile/layout.tsx
"use client";

import UserHeader from "@/public/components/UserProfile/UserHeader";



export default function UserProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Main content */}
      <main className="px-6 mt-6">{children}</main>
    </div>
  );
}
