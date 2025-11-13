"use client";

import { useState } from "react";
import Link from "next/link"




export default function Page(){

const [username , setUsername] = useState("");
const [password , setPassword] = useState("");   


return(
<div className="  items-center w-full  h-full flex-col justify-center flex  mt-30 gap-y-10  text-lg text-[#B9B9CE]     ">

<h1 className="text-2xl font-semibold    text-[#8f96be] ">Welcome Back!</h1>

<form className="flex flex-col justify-around  gap-y-10" >





{/*items*/}

<div className="flex gap-x-4 justify-between">
<h1 className="flex flex-col gap-y-2      items-start      gap-x-5 justify-between">User Name :
   <input value={username} onChange={(e)=>{setUsername(e.target.value)}} type="text" placeholder="User Name" className="rounded-xl w-80  py-1 px-4  bg-[#333333] focus:border-[#878b87] focus:outline-none "/></h1>

</div>




<div className="flex gap-x-4 justify-between">



<h1 className="flex  flex-col  gap-y-2    items-start     gap-x-5 justify-between">Password : 
  <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type = "password" placeholder="Password" className="rounded-xl w-80 py-1 px-4 bg-[#333333] focus:border-[#878b87] focus:outline-none"/></h1>
 
</div>







</form>
<div className="flex gap-x-10 mt-5 justify-between items-center gap-y-10">
<h1><Link href="/Auth/SignIn"> Don't have an account? SignUp </Link></h1>  
<button type="button"  className="font-medium bg-[#4b4679]   px-7 hover:cursor-pointer hover:bg-[#6d62cf] py-1 rounded-xl ">Log In</button> 
</div>
</div>


)




}