"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface UserHeaderProps {
  activeTab: "memes" | "battles" | "challenge";
  onSetActiveTab: (tab: "memes" | "battles" | "challenge") => void;
}

interface User {
  username: string;
  avatar?: string;
  coverphoto?: string;
  friends?: number;
}

export default function UserHeader({ activeTab, onSetActiveTab }: UserHeaderProps) {
  const params = useParams();
  const userId = params.userid;

  const [user, setUser] = useState<User | null>(null);

  // Fetching User Details
  useEffect(() => {
    if (!userId) return;

    const fetchUser = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/users/userbyid?userid=${userId}`
        );
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, [userId]);

  // Button style helper
  const buttonClass = (tab: "memes" | "battles" | "challenge") =>
    `px-4 py-2 rounded-lg ${
      activeTab === tab
        ? "bg-blue-600 text-white"
        : "bg-gray-800 text-white hover:bg-gray-700"
    }`;

  return (
    <div className="relative w-full mb-10 h-56">
      {/* COVER PHOTO */}
      <div className="w-full h-full bg-gray-700 rounded-md overflow-hidden relative">
        {user?.coverphoto && (
          <img
            src={user.coverphoto}
            className="w-full h-full object-cover"
            alt="cover"
          />
        )}

        {/* AVATAR + NAME */}
        <div className="absolute left-6 bottom-16 flex items-center gap-4">
          {user?.avatar && (
            <img
              src={user.avatar}
              className="w-24 h-24 rounded-full border-4 border-white object-cover shadow-lg"
              alt="avatar"
            />
          )}
          <div className="text-white drop-shadow">
            <h2 className="text-2xl font-bold">{user?.username}</h2>
            <p className="text-sm opacity-80">{user?.friends ?? 0} friends</p>
          </div>
        </div>

        {/* NAVIGATION BUTTONS */}
        <div className="absolute bottom-4 left-6 flex gap-4">
          <button
            className={buttonClass("memes")}
            onClick={() => onSetActiveTab("memes")}
          >
            Meme
          </button>
          <button
            className={buttonClass("battles")}
            onClick={() => onSetActiveTab("battles")}
          >
            Battle History
          </button>
          <button
            className={buttonClass("challenge")}
            onClick={() => onSetActiveTab("challenge")}
          >
            Challenge
          </button>
        </div>
      </div>
    </div>
  );
}
