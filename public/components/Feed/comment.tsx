"use client"
import { useEffect, useState } from 'react'
import { useContext } from 'react';
import { UserContext } from "@/public/UserContext";
import Commentcard from './Commentcard';
import loading from "../../Images/loading2.gif"
import Image from 'next/image';

function Comment({ meme , setcomment }: { meme: any , setcomment:(e:number)=>void  }) {

const { user } = useContext(UserContext);
const [comments , setComments] = useState<any>([])
const [commenttext , setcommenttext] = useState("")
const [isLoading , setLoading] = useState(false)
const [isposting , setPosting] = useState(false)

const deletecomment = async (comment:any)=>{

try{

  
setcomment(-1)


setComments((prev: any) => {
  const prevArray = Array.isArray(prev) ? prev : [];
  return prevArray.filter((c: any) => c._id !== comment._id);
});

await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/comments/protected?commentId=${comment._id}`,
    {method : "DELETE",
    credentials: "include",
    }
    
)  



}catch(e:any){

console.log(e.message)

}


}

{/** post comment */}

const postcomment = async()=>{

setPosting(true)

try{




if(commenttext === ""){
    return
}

setcomment(1)



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

}finally{

  setPosting(false)

}


}


{/* fetch comments */}

const fetchcomments = async()=>{
setLoading(true)
    try{

    const commentres = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/comments?memeId=${meme._id}`,{credentials: "include",})
    const comments = await commentres.json()
    setComments(comments)


    }catch(e:any){
        console.log(e.message)
    }finally{
      setLoading(false)
    }

}


useEffect(()=>{

    fetchcomments()
},[])

  return (
    <div className='flex gap-y-5 flex-col mb-10  px-5  sm:w-200 w-full '>
         
  {isLoading ? <div className="flex flex-col gap-y-4 justify-center text-green-800 items-center"><Image src={loading} alt="loading" width={170} height={170} /><h1 className="text-xl font-semibold">Loading</h1></div>:

    <div> {/** add comment */}
    <div className='flex flex-col gap-y-2 '>
    <input type='text' placeholder='Whats on your mind.' value={commenttext} onChange={(e)=>{setcommenttext(e.target.value)}}  className='rounded-xl  py-2 px-4 bg-[#333333] focus:border-[#878b87] focus:outline-none'/>
    <div className='flex gap-x-4 items-end mx-1 justify-end'>
    <button onClick={()=>{setcommenttext("")}} className='bg-[#2d4738] py-1 px-3 rounded-lg'>Cancel</button>
   
    { isposting?
     <button  className='bg-[#3c4942] py-1 px-3 rounded-lg'>Post</button> :   
      <button onClick={postcomment} className='bg-[#2d4738] py-1 px-3 rounded-lg hover:cursor-pointer hover:bg-[#3c4942]'>Post</button>    } 
    </div>
    </div>

    <div className='flex flex-col gap-y-5'>
    {Array.isArray(comments) && comments.length > 0 ? (
     [...comments].reverse().map((comment: any ,index:number) => (
        <Commentcard comment={comment} onDelete={deletecomment}  key={comment._id} />
    ))
    ) : 
    (
    <div className='mx-2'>No comments to show.</div>
    )}
    </div>
</div>
  }


    </div>
  )
}

export default Comment
