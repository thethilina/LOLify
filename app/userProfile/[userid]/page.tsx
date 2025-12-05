"use client";

import UserHeader from "@/app/userProfile/User/UserHeader";
import MemeCard from "@/public/components/Feed/MemeCard";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import BattleHistory from "../User/BattleHistory";

export default function Page() {
  const [usermeme, setuserMeme] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);


 



  //setuser params
  const params = useParams();
  const userId = params.userid;

  const fetchMemes = async () => {
    if (!userId) return;
    setLoading(true);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/memes/memebyuserid?userid=${userId}`
      );
      const memes = await res.json();
      console.log("Fetched memes:", memes); 
      setuserMeme(memes);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  // //fetchBattle history
const fetchBattleHistory  = async () => {
  if(!userId) return;
  setLoading(true);

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/memes/memebyuserid?userid=${userId}`
    );
  } catch (error) {
    
  }
}
  // <BattleHistory />

  // Auto-load memes when page refreshes
  useEffect(() => {
    fetchMemes();
  }, [userId]);

  // Remove meme after deletion
  const removeMeme = (deletedMeme: any) => {
    setuserMeme(usermeme.filter((m) => m._id !== deletedMeme._id));
  };

  return (
    <div>
     

      <div className="px-6 mt-6 flex flex-col gap-4">
        {loading && <p className="text-white animate-pulse">Loading memes...</p>}

        {!loading && usermeme.length === 0 && (
          <p className="text-gray-400">No memes found</p>
        )}

        {!loading &&
          usermeme.map((meme) => (
            <MemeCard
              key={meme._id}
              meme={meme}
              isOpen={true} // set true if you want comments to show by default
              removememe={removeMeme}
            />
          ))}
      </div>
    </div>
  );
}
