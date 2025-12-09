"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import UserHeader from "@/public/components/UserProfile/UserHeader";
import MemeCard from "@/public/components/Feed/MemeCard";
import BattleHistory from "@/public/components/UserProfile/BattleHistory";
import { status } from "nprogress";

interface FormattedBattle {
  username: string;
  avatar: string;
  endTime: string;
  status: string;
}

function Page() {
  const { userid } = useParams();

  const [activeTab, setActiveTab] = useState<"memes" | "battles" | "challenge">("memes");

  const [memes, setMemes] = useState<any[]>([]);
  const [memesLoading, setMemesLoading] = useState(false);

  const [battles, setBattles] = useState<FormattedBattle[]>([]);
  const [battlesLoading, setBattlesLoading] = useState(false);

  // Fetch memes
  const fetchMemes = async () => {
    if (!userid) return;
    setMemesLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/memes/memebyuserid?userid=${userid}`
      );
      const data = await res.json();
      setMemes(data);
    } catch (err) {
      console.error("Error fetching memes:", err);
    } finally {
      setMemesLoading(false);
    }
  };

  // Remove a meme from state
  const removeMeme = (deletedMeme: any) => {
    setMemes(memes.filter((m) => m._id !== deletedMeme._id));
  };

  // Fetch battle history and map to FormattedBattle
  const fetchBattleHistory = async () => {
    if (!userid) return;
    setBattlesLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/battle/User?userId=${userid}`
      );
      const data = await res.json();

      const formatted: FormattedBattle[] = (data.battles || []).map((battle: any) => {
        const isUserBy = battle.user_id_by._id === userid;
        const opponent = isUserBy ? battle.user_id_to : battle.user_id_by;

        let result = "Draw";
        if (battle.status === "isCompleted") {
          if (battle.winner?._id === userid) result = "Win";
          else if (battle.winner?._id !== userid) result = "Lose";
        }

        return {
          username: opponent.username,
          avatar: opponent.avatar || "/default-avatar.png",
          endTime: battle.endTime,
          status:result,
        };
      });

      setBattles(formatted);
    } catch (err) {
      console.error("Error fetching battle history:", err);
      setBattles([]);
    } finally {
      setBattlesLoading(false);
    }
  };

  // Auto-load memes on page mount
  useEffect(() => {
    fetchMemes();
  }, [userid]);

  return (
    <div className="flex flex-col gap-6">
      {/* User Header */}
      <UserHeader
        activeTab={activeTab}
        onSetActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === "memes") fetchMemes();
          if (tab === "battles") fetchBattleHistory();
        }}
      />

      <div className="px-6 flex flex-col gap-8">
        {/* Meme Section */}
        {activeTab === "memes" && (
          <section>
            {memesLoading && <p className="text-white animate-pulse">Loading memes...</p>}
            {!memesLoading && memes.length === 0 && (
              <p className="text-gray-400">No memes found</p>
            )}
            {!memesLoading &&
              memes.map((meme) => (
                <MemeCard
                  key={meme._id}
                  meme={meme}
                  isOpen={true}
                  removememe={removeMeme}
                />
              ))}
          </section>
        )}

        {/* Battle History Section */}
        {activeTab === "battles" && (
          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">Battle History</h2>
            <BattleHistory battles={battles} loading={battlesLoading} />
          </section>
        )}

        {/* Challenge Section */}
        {activeTab === "challenge" && (
          <section>
            <h2 className="text-xl font-semibold mb-4 text-white">Challenges</h2>
            <p className="text-gray-400">Coming soon...</p>
          </section>
        )}
      </div>
    </div>
  );
}

export default Page;
