import { IoHomeOutline } from "react-icons/io5";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { PiCrown } from "react-icons/pi";
import { LuUserRound } from "react-icons/lu";
import { CiSettings } from "react-icons/ci";


export default function SideNavBar(){


return(
<nav className="z-49 top-17 h-full pt-5 px-10   text-lg gap-y-5 text-[#A7A7D4]  items-start fixed left-0 flex flex-col border-r border-gray-500">
<div className="flex flex-col gap-y-4  border-gray-500 ">
<button className="flex items-center gap-x-4 px-7 rounded-2xl py-3 bg-[#0d0d0f]  "><IoHomeOutline  size={25}/> Home</button>
<button className="flex items-center gap-x-4 px-7 rounded-2xl py-3 bg-[#0d0d0f] "><LiaUserFriendsSolid size={25} /> Friends</button>
<button className="flex items-center gap-x-4 px-7 rounded-2xl py-3 bg-[#0d0d0f] "><PiCrown size={25} /> Leader Board</button>
<button className="flex items-center gap-x-4 px-7 rounded-2xl py-3 bg-[#0d0d0f] "><LuUserRound size={25} />Profile</button>
<button className="flex items-center gap-x-4 px-7 rounded-2xl py-3 bg-[#0d0d0f] "><CiSettings size={25} />Settings</button>
</div>
</nav>




)






}