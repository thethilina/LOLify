"use client";
import { FaCamera } from "react-icons/fa";
import { useState } from "react";


export default function SignIn(){



const [profilepic , setProfilepic] = useState<File | null>(null);
const [coverphoto , setCoverphoto] = useState<File | null>(null);
const [username , setUsername] = useState("");
const [email , setEmail] = useState("");
const [age , setAge] = useState(0);
const [password , setPassword] = useState("");

    

  const handleProfileChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setProfilepic(e.target.files[0]); 
    }
  };

    const handleCoverChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCoverphoto(e.target.files[0]); 
    }
  };


const handleSubmit = async () => {
  try {
    if(!profilepic || !coverphoto || !username || !email || !age || !password){
      console.log("Please fill all the fields");
      return;
    }

  
    const pp = new FormData();
    pp.append("file", profilepic);
    const profilepicResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/uploadphotos`, {
      method: "POST",
      body: pp
    });

    const profilepicUrl = await profilepicResponse.json();
    alert(profilepicUrl.secure_url);

    
    
    const cp = new FormData();
    cp.append("file", coverphoto);
    const coverphotoResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/uploadphotos`, {
      method: "POST",
      body: cp
    });
    const coverphotoUrl = await coverphotoResponse.json();
    alert(coverphotoUrl.secure_url);

  
      const body = {
      avatar: profilepicUrl.secure_url,
      coverphoto: coverphotoUrl.secure_url,
      username,
      email,
      birthdate: age.toString(), 
      password,
      orbs: 0
    };


    const newuserResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/register`, {
      method: "POST",
       headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    });
    const newuserData = await newuserResponse.json();
    console.log(newuserData);
    alert("Registration Successful");

  } catch(e:any) {
    console.error("Error during registration:", e.message);
  }
};




return(

<form className="bg-[#161616] items-center flex flex-col gap-y-10 text-lg py-20 px-10  border-gray-500 border-2 rounded-xl  ">




{/* profile pic and cover photo */}

<div className="h-40 w-full bg-gray-600 flex  justify-between  border-2 border-gray-400  rounded-t-xl" style={{
        backgroundImage: coverphoto ? `url(${URL.createObjectURL(coverphoto)})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>

<div className="flex justify-end items-end "    >
<div style={{
        backgroundImage: profilepic ? `url(${URL.createObjectURL(profilepic)})` : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }} className="w-20 border-3 border-gray-900 h-20 bg-gray-500 rounded-full  m-5  flex justify-end items-end "><input  onChange={handleProfileChange} type="file" accept=".jpg,.jpeg,.png" className="absolute  opacity-0 h-10 w-10 hover:cursor-pointer "/> <FaCamera className="bg-gray-800 p-2 h-8 w-8 hover:bg-gray-900 hover:cursor-pointer border-gray-400 rounded-full hover:border hover:border-gray-600"/>   </div>
</div>

<div   className="bg-gray-800 p-3 h-10 w-10 m-2 border-gray-400  flex items-center hover:cursor-pointer hover:border hover:border-gray-400 hover:bg-gray-900   rounded-full">
< FaCamera  />
<input onChange={handleCoverChange} type="file" accept=".jpg,.jpeg,.png" className="absolute  opacity-0 h-10 w-10 hover:cursor-pointer "/>
</div>


</div>


{/*items*/}
<div className="flex flex-col  gap-y-7">
<h1 className="flex items-center gap-x-5 justify-between">Set Your User Name : <input value={username} onChange={(e)=>{setUsername(e.target.value)}} type="text" placeholder="User Name" className="rounded-xl py-1 px-4 bg-[#333333] border-gray-400 border-2"/></h1>
<h1 className="flex items-center gap-x-5 justify-between">Enter Your Emaill : <input value={email} onChange={(e)=>{setEmail(e.target.value)}}  type = "email" placeholder="Email" className="rounded-xl py-1 px-4 bg-[#333333] border-gray-400 border-2 "/></h1>
<h1 className="flex items-center gap-x-5 justify-between">Enter Your Age : <input value={age} onChange={(e)=>{setAge(parseInt(e.target.value))}} type = "number" placeholder="Age" className="rounded-xl py-1 px-4 bg-[#333333] border-gray-400 border-2 "/></h1>
<h1 className="flex items-center gap-x-5 justify-between">Create Your Password : <input value={password} onChange={(e)=>{setPassword(e.target.value)}} type = "password" placeholder="Password" className="rounded-xl py-1 px-4 bg-[#333333] border-gray-400 border-2 "/></h1>
 
</div>

<div>
<button type="button" onClick={handleSubmit} className="font-medium bg-[#897ef1]  py-1 px-7 hover:cursor-pointer hover:bg-[#6d62cf] text-xl rounded-xl ">Sign In</button> 
</div>



</form>


)




}