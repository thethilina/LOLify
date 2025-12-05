"use client";

import { useParams } from 'next/navigation';
import  { useEffect, useState } from 'react'


interface UserHeaderProps{
  onLoadBattleHistory: () => void;
}

export default function BattleHistory ({onLoadBattleHistory}:UserHeaderProps) {


const [battleHistory,setbattleHistory] = useState<any>(null);
const [loading,setloading] = useState(false)

//setting useparams
  const params = useParams;
  const userId = params.userid;

   useEffect(()=> {
    if(userId)
   },[])
  return (
    <div>
     
    </div>
  )
}
    
 
