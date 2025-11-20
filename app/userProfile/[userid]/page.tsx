"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import MemeCard from "@/public/components/Feed/MemeCard";

const Page = () => {
  const [user, setUserData] = useState<any>(null);
  const [usermeme, setusermeme] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showMemes, setShowMemes] = useState(false);

  const handleMemeClick = () => {
    setShowMemes((prev) => !prev);
  };

  // get user id from the dynamic route
  const params = useParams();
  const userId = params.userid;

  // fetch data from get user data by ID end point
  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        console.log(`user ID: ${userId}`);
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/users/userbyid?userid=${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!res.ok) throw new Error("Failed to fetch data");

        const json = await res.json();
        setUserData(json);

        console.log(`user info: ${JSON.stringify(json)}`);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  //get users meme
  const getusermeme = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/memes/memebyuserid?userid=${userId}`
    );
//
    const memes = await res.json();
    setusermeme(memes);
  };

  useEffect(() => {
    if(!params.userid) return;
    getusermeme();
  }, [userId]);

  return (
    <>
      <div className="relative w-full">
        {/* Cover Photo */}
        {user?.coverphoto && (
          <img
            src={user.coverphoto}
            alt="cover"
            className="object-cover h-55 w-full rounded-md"
          />
        )}

        {/*avatar and user name */}
        <div className="absolute top-4 left-4  flex items-center gap-3">
          {user?.avatar && (
            <img
              src={user.avatar}
              alt="avatar"
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
            />
          )}

          <h2 className="text-xl font-semibold text-white drop-shadow-lg">
            {user?.username}
          </h2>
          <h4 className="absolute top-5 left-4 flex-items-center">
            {user?.friends}
          </h4>
        </div>
        <div className="absolute top-29 left-4 size-">
          {/*buttons */}
          <div className="mt-5 flex flex-col gap-5">
            <button
              className="px-2 py-1 bg-gray-800 rounded-lg "
              onClick={handleMemeClick}
            >
              Meme
            </button>
            
          </div>
          
        </div>
        <div className="">
              {showMemes && (
              <div className="flex flex-col gap-5 mt-3">
                {usermeme.length === 0 ? (
                  <p className="text-white">No memes uploaded yet!</p>
                ) : (
                  usermeme.map((meme: any) => (
                    <MemeCard
                      key={meme._id}
                      meme={meme}
                      isOpen={false}
                      removememe={() => {}}
                    />
                  ))
                )}
              </div>
            )}
            </div>
      </div>
    </>
  );
};

export default Page;
