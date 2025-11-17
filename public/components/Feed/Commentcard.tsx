"use client"


import { useState , useEffect } from "react"
import Image from "next/image";
import { MdDeleteOutline } from "react-icons/md";
import { useContext } from "react";
import { UserContext } from "@/public/UserContext";


function Commentcard({ comment, onDelete }: { comment: any, onDelete: any }) {

const [commenteduser, setcommented] = useState<any>(null);
const { user} = useContext(UserContext);






  const getuser = async () => {

    const userres = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/users/userbyid?userid=${comment.userid}`
    );
    const user = await userres.json();
    setcommented(user);
  };

useEffect(()=>{

getuser()

},[])



  return (
    <div className="flex flex-col py-4 px-5 gap-y-3 rounded-2xl bg-[#1f1e22] ">

    <div className="flex items-center justify-between text-gray-400">    
    <div className="flex items-center gap-x-3">
        <Image  src={commenteduser?.avatar} alt="avatar" width={35} height={35} className="rounded-full" />
        <h1 className="">{commenteduser?.username}</h1>
    </div>
        <div className="flex gap-x-2 items-center">
       { commenteduser?._id === (user as any)._id  && <MdDeleteOutline onClick={()=>{onDelete(comment)}} size={23} className="hover:bg-gray-700 hover:cursor-pointer rounded-full p-1" />  }  
        <h1 className="text-sm">{new Date(comment.createdAt).toLocaleDateString()}  </h1>
        </div>    
  
    </div>
    <div className="mx-12 text-gray-300">    
        <h1>{comment.body}</h1>
    </div>    
    </div>
  )
}

export default Commentcard
