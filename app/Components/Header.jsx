'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { HiBell, HiChat, HiSearch } from "react-icons/hi";
import { AiOutlineUser } from "react-icons/ai";
import Logo from './assits/image/pinterest-1 (1).svg'
import userimage from './assits/image/1946429.png';
import { useAuth } from '../Context/ContextAuth';
import { db } from '../firebaseConfig';
import { setDoc, doc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
const Header = () => {
  const [inputs, setInputs] = useState({});
  const { user, googleSignIn, LogOut } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    SaveUserInfo();
  }, [user]);

  const SaveUserInfo = async () => {
    if (user) {
      await setDoc(doc(db, "user", user.email), {
        displayName: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });
    }
  };

  const onCreateClick = () => {
    if(user) {
      router.push('/pin-builder')
    } else {
      handleSignIn()
    }
  }

  const handleSignIn = async () => {
    try {
      await googleSignIn().then(() => {
        SaveUserInfo();
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogOut = async () => {
    try {
      await LogOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex gap-3 md:gap-2 items-center p-2 '>
      <Image
        width={50}
        height={50}
        src={Logo}
        alt='logo'
        onClick={() => router.push('/')}
        className='hover:bg-gray-300 p-2 rounded-full cursor-pointer'
      />
      <button className='bg-black text-white p-2 px-4 rounded-full flex gap-5 h-12 items-center md:block'>

        <span  onClick={() => router.push('/')} >Home</span>
      </button>
      <button className='font-semibold text-black p-2 px-4 rounded-full'>
      <h1 onClick={onCreateClick}>create</h1> 
      </button>

      <div className='bg-[#e9e9e9] p-3 flex gap-3 items-center rounded-full w-full h-12'>
        <HiSearch className='text-[25px] text-gray-500 ' />
        <input type='text' placeholder='Search' className='bg-transparent outline-none' />
      </div>
      <HiBell className="text-[40px] text-gray-500 hidden md:block " />
      <HiChat className="text-[40px] text-gray-500 hidden md:block  " />
      {user && user.photoURL && (
        <Image
          width={50}
          height={50}
          alt='ammar'
          src={user.photoURL}
          onClick={() => router.push('/' + user.email)}
          className='hover:bg-gray-300 p-2 rounded-full cursor-pointer'
        />
      )}
    </div>
  );
};

export default Header;