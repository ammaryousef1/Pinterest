'use client'
import React from 'react'
import { useAuth } from '../Context/ContextAuth'
import Image from 'next/image'
const UserTag = ({user}) => {
    

  return (
    <div className='m-2'>
        {user?
        <div className='flex gap-4 items-center'>
            <Image
             src={user?.photoURL} 
             alt=''
             width={50}
             height={50}
             className='rounded-full'
             />
          
                <h2 className="text-[14px] font-medium">{user.displayName}</h2>

        </div>
        :null }
    </div>
  )
}

export default UserTag