"use client"
import Image from "next/image";
import { LuUpload } from "react-icons/lu";
import { useState } from "react";
import { MdOutlineDelete } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { useRouter } from "next/navigation";
import { useTopLoader } from 'nextjs-toploader';
import { UserContext } from "@/public/UserContext";
import { useContext } from "react";

export default function Page(){

const loader = useTopLoader();
const[message , setMessage] = useState<string>("");
const [title, setTitle] = useState("")
const [meme , setMeme] = useState<any>(null)
const [memefile , setmemefile] = useState<any>(null);
const [taglines , setLines] = useState<any>([])
const [isOpen , setOpen] = useState(false)
const [temptag,settempTag] = useState("")
const router = useRouter();
const { user, setUser } = useContext(UserContext);


const setmessage = (msg:string) => {

setMessage(msg);
setTimeout(() => {
  setMessage("");
},5000);


}
const handlesettile = ()=>{

if(temptag === ""){
 setOpen(false)
 return   
}

setLines((prev: any) => [...prev , temptag])
settempTag("")
setOpen(false)

}

const handleProfileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file =e.target.files[0];
      setmemefile(file)
      const memeurl = URL.createObjectURL(file)
      setMeme(memeurl) 
    }
  };

const handleremovetag = (tag:any)=>{

setLines((prev:any) => prev.filter((taglines: any) => taglines !== tag));


}


const handlepost = async()=>{

    try{

    loader.start()

    const maxSize = 5 * 1024 * 1024;

    if(!title || !meme ){
      setmessage("Please fill in all fields");
      loader.done()
      return;
    }

       if(meme.size > maxSize){

        setmessage("Meme can't be larger than 5MB");
        loader.done()
        return
    }

      const cp = new FormData();
    cp.append("file", memefile);
    const coverphotoResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/uploadphotos`, {
      method: "POST",
      body: cp
    });
    const memeUrl = await coverphotoResponse.json();
  
    const body = {
  "memetitle": title,
  "taglines": taglines,
  
  "memeimg": memeUrl.secure_url,
  "userid": (user as any)._id

    }

   const memeres = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/memes/protected` , {
        method: "POST",
           mode:"no-cors",
       headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body),
        credentials: "include",
   })

   loader.done()
   router.push("/")
    }catch(e:any){

            setmessage("Error during posting meme")
            loader.done()
            return

    }


}








return(

<div className=" items-start h-full flex flex-col  justify-center   mx-50 my-30 gap-y-10  text-lg text-[#B9B9CE] ">
<h1 className="text-2xl font-semibold">Post Memes</h1>


<div className="flex gap-x-10">
{taglines.map((tag:any)=>{

return(
<div className="flex items-center gap-x-3 gap-y-1 bg-gray-800 px-3 py-1 rounded-xl ">
<h1>{tag}</h1>
<MdCancel onClick={()=>{handleremovetag(tag)}} size={15} className="hover:cursor-pointer" />
</div>
)


})


}
</div>

<input onChange={(e)=>{setTitle(e.target.value)}}  value={title} type="text" placeholder="Title" className="border border-gray-500  rounded-xl  w-150   py-2 px-4  bg-[#1F1F24] focus:border-[#878b87] focus:outline-none " />

<button onClick={()=>{isOpen?setOpen(false):setOpen(true)}}   className=" bg-[#303030]   px-3 hover:cursor-pointer hover:bg-[#444444] py-1 rounded-2xl ">Add Tags</button>

{ meme ? 
<div className="w-100 h-100  bg-[#0c0c0c] flex border-dotted items-start  justify-end rounded-xl ">
 <MdOutlineDelete size={30}  className="hover:cursor-pointer  p-1 m-2 bg-gray-900 rounded-full  text-gray-300 hover:bg-gray-800 z-50" onClick={()=>{setMeme(null)}}/>
<Image src={meme} width={150} height={150} className="h-100 w-100 absolute object-contain rounded-xl border border-gray-500 border-dotted" alt="dfsg"/>
</div> 
:  
<div id="upload" className="w-150 h-50 gap-x-5  bg-[#1F1F24] flex border-dotted items-center justify-center rounded-xl border border-gray-500 ">
<input onChange={handleProfileChange}  type="file" accept=".jpg,.jpeg,.png"  className="absolute w-150 h-50 opacity-0 cursor-pointer"/>
<h1>Attach Your Meme</h1><LuUpload size={25} />

</div>
}

<button onClick={handlepost} className="font-medium bg-[#4b4679]    px-7 hover:cursor-pointer hover:bg-[#6d62cf] py-1 rounded-xl ">Post</button>
{message && <div className="text-red-500 font-medium">{message}</div>}

{isOpen && <div onClick={() => setOpen(false)}   className="absolute w-screen h-screen flex items-center  ">
    
<div className="flex flex-col  items-center justify-center rounded-xl border border-gray-400  bg-[#0F0F11] w-70 p-5 b gap-y-5 h-50">


<input onClick={(e) => e.stopPropagation()} onChange={(e)=>{settempTag(e.target.value)}}   type="text" placeholder="tagline" className="border border-gray-500  rounded-xl     py-1 px-2  bg-[#1F1F24] focus:border-[#878b87] focus:outline-none"/>
<button onClick={(e) => {e.stopPropagation(); handlesettile()}} className="px-2 py-1 bg-gray-600 rounded-xl hover:cursor-pointer">Add</button>


</div>        
    
</div>    }



</div>

)









}