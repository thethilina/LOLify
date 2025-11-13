"use client"


import Logo from "../Images/Logo.png"
import Image from "next/image"
import { IoIosSearch } from "react-icons/io";
import { IoCreateOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaRegUser } from "react-icons/fa6";
import { IoIosCreate } from "react-icons/io";
import { useState } from "react";
import Link from "next/link";


export default  function NavBar(){

{/* popup login */}

const [isOpened , setOpen] = useState(false);







return(



<div>
<nav className="top-0 z-50 fixed w-screen flex justify-between px-10 py-3 items-center border-b border-gray-500 bg-[#0F0F11]">
<Link href="/">
{/* Logo */}
<div className="flex items-center gap-x-4">
<Image className="w-10" src={Logo} alt="Logo"/>
<h1 className="text-2xl font-bold text-[#246d3c]  ">LOLify</h1>
</div>
</Link>

{/* Search Bar */}




<form className="flex items-center ml-50 ">
<input className = "bg-[#2b2b2b] w-100   py-2 pl-10 px-2  rounded-l-full  focus:border-[#878b87] focus:outline-none"  type="text" placeholder="Search Lolify" />
<button className="bg-[#3b3b3b]   py-2.5 px-2 rounded-r-full hover:cursor-pointer"><  IoIosSearch  size={20 }/></button>
</form>



{/* right side buttons */}
<div className="flex items-center gap-x-8">


<button className="flex items-center justify-center gap-x-2  text-gray-300 border-[#515151] py-1 px-4 border-2 rounded-xl hover:cursor-pointer">< IoCreateOutline  size={25}/> Create</button>

<button><IoMdNotificationsOutline size={28}/></button>

<Link href="/Auth/LogIn">  <button onClick={()=>{setOpen(true)}}  
className=" border text-sm border-gray-400 text-[#ffffff] bg-[#246d3c] rounded-2xl py-1 px-3 font-semibold hover:cursor-pointer" >Log In   </button></Link> 

</div>

</nav>





</div>

)


}