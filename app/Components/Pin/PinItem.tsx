import Image from 'next/image'
import React from 'react'
import UserTag from '../UserTag'
import { useRouter } from 'next/navigation'

const PinItem = ({pin}) => {
  const router = useRouter()
    const user = {
        name: pin?.userName,
        image: pin?.userImage
    }
  return (
    <div className=' flex flex-col'>
        <div className=' relative before:absolute  before:h-full  before:w-full before:rounded-3xl  hover:before:bg-gray-600 before:opacity-50cursor-pointer '>
          <img src={pin.image}  alt={pin.title} width={500}  height={500} className='rounded-3xl cursor-pointer relative z-0' />
        </div>
    </div>
  )
}

export default PinItem