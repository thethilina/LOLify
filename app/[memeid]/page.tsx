"use client"
import { useState , useEffect } from 'react'
import MemeCard from '@/public/components/Feed/MemeCard';
import { useParams } from "next/navigation";
import Comment from '@/public/components/Feed/comment';
function page({ params }:any) {

  const { memeid } =  useParams();
  const [meme , setMeme] = useState<any>(null)


  useEffect(()=>{

    getmeme()


  },[]


  )


  const getmeme = async ()=>{

    try{

      const memeres = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/memes/memebyid?memeid=${memeid}`)
      const meme = await memeres.json()
      setMeme(meme);


    }catch(e:any){

      console.log("error "+e.message)
    }



  }


  return (
    <div className='flex flex-col  gap-y-5 items-center justify-center'>
    {meme&&<MemeCard meme = {meme} />}
    {meme && <Comment meme = {meme} />}
    </div>
  )
}

export default page
