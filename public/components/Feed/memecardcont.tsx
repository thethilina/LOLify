"use client"
import { useState , useEffect } from "react"
import MemeCard from "./MemeCard"


export default function Memecardcont() {

const [memes , setMemes] = useState([])

const fetchmeme = async() =>{

try{

const memesres = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/memes`)

const memes = await memesres.json();
setMemes(memes)
console.log(memes)

}catch(e:any){
console.log(e.message)

}


}

useEffect(
()=>{
fetchmeme()
}, []

)
  return (


    <div className="flex flex-col w-full items-center  gap-y-5">

     { memes.map((meme:any)=>{
        return(
            
       <MemeCard meme = {meme} />
          

        )


     })




     } 


      
    </div>
  )
}



