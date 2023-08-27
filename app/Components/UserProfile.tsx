"use client"
import Image from 'next/image'
import React from 'react'
import { useAuth } from '../Context/ContextAuth'
import { useRouter } from 'next/navigation'

const UserProfile = ({userInfo}) => {
    const { user ,  LogOut } = useAuth()
    const router = useRouter()

    const handleLogOut = async () => {
      try {
        await LogOut();
        router.push('/')
      } catch (error) {
        console.log(error);
      }
    };

  

  return (
    <div className='flex flex-col items-center my-10'>
        <Image
         src={userInfo.photoURL} 
         alt=""
         width={100}
         height={100}
         className='rounded-full' 
        
         />
         <h2 className='text-[25px] font-semibold'>{userInfo.displayName}</h2>
         <h2 className='text-gray-400'>{userInfo.email}</h2>
        <div className='flex gap-5'>
          { userInfo.title}
          {user?.email === userInfo.email?  
          <button
           onClick={handleLogOut}
           className='bg-gray-300 p-2 px-3 mt-5 font-semibold rounded-full'>
            LogOut
          </button>
          :null}
          <button className='bg-gray-300 p-2 px-3 mt-5 font-semibold rounded-full'>Share</button>
        </div>
    </div>
  )
}

export default UserProfile