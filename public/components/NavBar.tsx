"use client"

import { UserContext } from "@/public/UserContext";
import { useContext } from "react";
import Logo from "../Images/Logo.png"
import Image from "next/image"
import { IoIosSearch } from "react-icons/io";
import { IoCreateOutline } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaRegUser } from "react-icons/fa6";
import { IoIosCreate } from "react-icons/io";
import { useState } from "react";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTopLoader } from 'nextjs-toploader';




export default function NavBar() {

  {/* popup login */ }
  const loader = useTopLoader();
  const [isOpened, setOpen] = useState(false);

  const router = useRouter();
  const { user, setUser } = useContext(UserContext);


  useEffect(() => {
    setOpen(false);
  }, [user]);




  const handleLogout = async () => {

    try {
      loader.start()
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      setUser(null);
      router.push("/")
      loader.done()


    } catch (e: any) {

      console.log("error logging out" + e.message)
      loader.done()
    }





  }




  return (




    <nav className="top-0 z-50  fixed  w-full  flex  justify-between  px-10 py-3 items-center border-b border-gray-500 bg-[#0F0F11]">
      <Link href="/">
        {/* Logo */}
        <div className="flex items-center gap-x-4">
          <Image className=" sm:block hidden w-8" src={Logo} alt="Logo" />
          <h1 className="text-xl font-bold text-[#246d3c]  ">LOLify</h1>
        </div>
      </Link>

      {/* Search Bar */}




      <form className="sm:flex items-center hidden ">
        <input className="bg-[#2b2b2b] sm:w-100  sm:50  py-2 pl-10 px-2  rounded-l-full  focus:border-[#878b87] focus:outline-none" type="text" placeholder="Search Lolify" />
        <button className="bg-[#3b3b3b]   py-2.5 px-2 rounded-r-full hover:cursor-pointer"><  IoIosSearch size={20} /></button>
      </form>



      {/* right side buttons */}
      <div className="flex items-center gap-x-4   sm:gap-x-8">

        {user && <>
          <Link href="/post"><button className="flex items-center justify-center gap-x-2  text-gray-300 sm:py-1 sm:px-3  hover:bg-[#1a1a1d]  rounded-xl hover:cursor-pointer">< IoCreateOutline size={25} /> <h1 className="sm:block hidden">Create</h1></button></Link>

          <button><IoMdNotificationsOutline size={25} /></button></>
        }

        {user ?
          <div>
            <Image onClick={() => { isOpened ? setOpen(false) : setOpen(true) }} src={(user as any).avatar} alt="useravatar" width={30} height={30} className=" rounded-full border   border-gray-600 hover:cursor-pointer" />
            {isOpened && <div ref={e => e?.focus()} onBlur={() => setOpen(false)} tabIndex={0} className="  absolute right-5 top-14 bg-[#28282c]  rounded-2xl">
              <ul className="p-3 flex flex-col gap-y-3">
                <li className="hover:cursor-pointer "  >Profile</li>
                <li className="hover:cursor-pointer " >Settings</li>
                <li className="hover:cursor-pointer " onClick={handleLogout}>Log Out</li>

              </ul>

            </div>}

          </div>

          :

          <Link href="/Auth/LogIn">  <button onClick={() => { setOpen(true) }}
            className=" border text-sm border-gray-400 text-[#ffffff] bg-[#246d3c] rounded-2xl py-1 px-3 font-semibold hover:cursor-pointer" >Log In   </button></Link>
        }
        <  IoIosSearch size={25} className="sm:hidden block" />
      </div>

    </nav>







  )


}