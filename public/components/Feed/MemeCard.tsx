"use client"

import { useContext } from 'react';
import Image from 'next/image';
import { useEffect, useState } from 'react'
import { HiDotsVertical } from "react-icons/hi";
import { AiOutlineLike } from "react-icons/ai";
import { UserContext } from "@/public/UserContext";
import { AiOutlineDislike } from "react-icons/ai";
import { LiaCommentSolid } from "react-icons/lia";


function MemeCard({ meme }: { meme: any }){

const { user, setUser } = useContext(UserContext);
const [memeuser,setmemeUser] = useState<any>(null);
const [isliked , setisliked] = useState(false);
const [isdisliked , setisdisliked] = useState(false);
const [likecount , setlikecount] = useState(0)
const [dislikecount , setdislikecount] = useState(0)

{/* like and undo function */}

const like = async()=>{

if(isliked || isdisliked){

    return
}

const likeres = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/memes/protected/likememe?userId=${(user as any)?._id}&memeId=${meme._id}`
,{method: "POST",
  
  credentials: "include",
})

if(!likeres.ok){
    alert("Error")
    return
}

setisliked(true)
setlikecount(likecount+1)


}
const unlike = async()=>{

if(!isliked){

    return
}

const likeres = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/memes/protected/likememe/undo?userId=${(user as any)?._id}&memeId=${meme._id}`
,{method: "POST",
  credentials: "include",
})
if(!likeres.ok){
    alert("Error")
    return
}
setisliked(false)
setlikecount(likecount-1)


}


{/* dislike and undo function */}

const dislike = async()=>{

if(isdisliked || isliked){

    return
}

const likeres = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/memes/protected/dislikememe?userId=${(user as any)?._id}&memeId=${meme._id}`
,{method: "PATCH",
  
  credentials: "include",
})

if(!likeres.ok){
    alert("Error")
    return
}

setisdisliked(true)
setdislikecount(dislikecount+1)


}
const undislike = async()=>{

if(!isdisliked){

    return
}

const likeres = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/memes/protected/dislikememe/undo?userId=${(user as any)?._id}&memeId=${meme._id}`
,{method: "PATCH",
  credentials: "include",
})
if(!likeres.ok){
    alert("Error")
    return
}
setisdisliked(false)
setdislikecount(dislikecount-1)


}

{/* get meme posted user */}
const getuser = async ()=>{
  setlikecount(meme.likecount.length)
  setdislikecount(meme.dislikecount.length)
const userres = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/users/userbyid?userid=${meme.userid}`)
const user = await userres.json()
setmemeUser(user)

}

useEffect(
()=>{

getuser()






},[]


)
useEffect(() => {
  if (!user) return; 

  if (meme.likecount.includes((user as any)._id)) {
    setisliked(true);
  }

  if (meme.dislikecount.includes((user as any)._id)) {
    setisdisliked(true);
  }



}, []);






  return (

  <div className='border border-gray-500 rounded-lg p-5 w-200  bg-[#17171b]  gap-y-3 flex flex-col'>


{/* upper meme section */}
  <div className='flex justify-between items-center px-2 '>  

  <div className='flex items-center gap-x-3'>
  <Image src={memeuser?.avatar} alt='useravatar' width={30} height={30} className='rounded-full border border-gray-500' />  
  <h1>{memeuser?.username}</h1>
  </div>  
  <div className='flex gap-x-2 items-center'>
  <h1 className='text-sm'>{new Date(meme.createdAt).toLocaleDateString()}</h1> 
  <HiDotsVertical size={15} />
 
  </div>
  
  </div>

{/* tags */}

<div className='flex gap-x-3 px-2 text-blue-200'>
{meme.taglines !== 0 &&
meme.taglines.map((tag:any)=>{
 return <h1 className=''>#{tag}</h1>   
})

}

</div>

<h1 className='px-2 font-semibold'>{meme.memetitle}</h1>

{/* image*/}

<div className='bg-black h-100 w-full rounded-lg'>
<Image src={meme.memeimg} alt='meme' width={150} height={150} className='h-100 w-full object-contain  '/>
</div>

{/* buttons bottom */}
<div className='flex gap-x-5 mx-2 items-center'>


{/* like button */}

{ isliked?
<button   className=' flex  items-center gap-x-1 ' onClick={unlike} ><AiOutlineLike className='bg-[#2e2e35] rounded-full p-2 hover:bg-[#464652] hover:cursor-pointer' size={35}/> {likecount !== 0 && <h1>{likecount}</h1>}</button>:    
<button className='flex  items-center'   onClick={like} ><AiOutlineLike className=' rounded-full p-2 hover:bg-[#464652] hover:cursor-pointer' size={35}/> {likecount !== 0 && <h1>{likecount}</h1>}</button>}

{/* dislike button */}

{ isdisliked?
<button onClick={undislike} className=' flex  items-center gap-x-1 '><AiOutlineDislike className='bg-[#2e2e35] rounded-full p-2 hover:bg-[#464652] hover:cursor-pointer' size={35}/> {dislikecount !== 0 && <h1>{dislikecount}</h1>}</button>:
<button onClick={dislike} className=' flex  items-center '><AiOutlineDislike className=' rounded-full p-2 hover:bg-[#464652] hover:cursor-pointer'   size={35}/>{dislikecount !== 0 && <h1>{dislikecount}</h1>}</button>
}




<button><LiaCommentSolid size={20} />
</button>    
</div>




    </div>
  )
}

export default MemeCard
