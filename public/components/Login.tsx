
export default function Login(){


    


return(

<form className="bg-[#161616]  flex flex-col gap-y-10 text-lg py-20 px-10 border-gray-500 border-2 rounded-xl  items-center ">

<div className="flex flex-col items-center justify-center  gap-y-7">
<input type="text" placeholder="Enter Your User Name" className="rounded-xl py-1 px-4 bg-[#333333] border-gray-400 border-2"/>
<input type = "password" placeholder="Enter Your Password" className="rounded-xl py-1 px-4 bg-[#333333] border-gray-400 border-2 "/>

<h1 className="text-gray-400">Don&apos;t have an account ? Sign up </h1>   
</div>

<div>
 <button className="font-medium bg-[#897ef1]  py-1 px-7 hover:cursor-pointer hover:bg-[#6d62cf] text-xl rounded-xl ">Log In</button> 
</div>



</form>


)




}