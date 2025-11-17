"use client"
import { useEffect, useState } from 'react'
import { useContext } from 'react';
import { UserContext } from "@/public/UserContext";
import Commentcard from './Commentcard';

function Comment({ meme }: { meme: any }) {

const { user } = useContext(UserContext);
const [comments , setComments] = useState<any>([])
const [commenttext , setcommenttext] = useState("")

const deletecomment = async (comment:any)=>{

try{

await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/comments/protected?commentId=${comment._id}`,
    {method : "DELETE",
    credentials: "include",
    }
    
)    

setComments((prev: any) => {
  const prevArray = Array.isArray(prev) ? prev : [];
  return prevArray.filter((c: any) => c._id !== comment._id);
});



}catch(e:any){

console.log(e.message)

}


}

{/** post comment */}

const postcomment = async()=>{

try{

if(commenttext === ""){
    return
}

const comment = {
    "body" : commenttext,
    "userid": (user as any)?._id,
    "memeid": meme._id

}

const commentres = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/comments/protected`,{
       method: "POST",
       headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(comment),
        credentials: "include",
})

const newcomment = await commentres.json()

setComments((prev: any) => {
  const prevArray = Array.isArray(prev) ? prev : [];
  return [...prevArray, newcomment.newcomment];
});

setcommenttext("")
}catch(e:any){

console.log(e.message)

}


}


{/* fetch comments */}

const fetchcomments = async()=>{

    try{

    const commentres = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/comments?memeId=${meme._id}`,{credentials: "include",})
    const comments = await commentres.json()
    setComments(comments)


    }catch(e:any){
        console.log(e.message)
    }

}


useEffect(()=>{

    fetchcomments()
},[])

  return (
    <div className='flex gap-y-5 flex-col  w-200 '>
    
     {/** add comment */}
    <div className='flex flex-col gap-y-2 '>
    <input type='text' placeholder='Whats on your mind.' value={commenttext} onChange={(e)=>{setcommenttext(e.target.value)}}  className='rounded-xl  py-2 px-4 bg-[#333333] focus:border-[#878b87] focus:outline-none'/>
    <div className='flex gap-x-4 items-end mx-1 justify-end'>
    <button onClick={()=>{setcommenttext("")}} className='bg-[#2d4738] py-1 px-3 rounded-lg'>Cancel</button>
    <button onClick={postcomment} className='bg-[#2d4738] py-1 px-3 rounded-lg'>Post</button>    
    </div>
    </div>

    {Array.isArray(comments) && comments.length > 0 ? (
     [...comments].reverse().map((comment: any ,index:number) => (
        <Commentcard comment={comment} onDelete={deletecomment}  key={comment._id} />
    ))
    ) : 
    (
    <div className='mx-2'>No comments to show.</div>
    )}

   


    </div>
  )
}

export default Comment
