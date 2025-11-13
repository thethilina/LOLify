"use client";

import { ProgressProvider } from "@bprogress/next/app";
import NavBar from "../public/components/NavBar";
import SideNavBar from "../public/components/SideNavBar";

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ProgressProvider>
      <NavBar />
      <SideNavBar />
      <div className="ml-70 mt-20">{children}</div>
    </ProgressProvider>
  );
}
