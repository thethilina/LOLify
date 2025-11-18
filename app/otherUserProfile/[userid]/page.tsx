"use client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const [user, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  return <div>{user?.username}</div>;
};

export default Page;
