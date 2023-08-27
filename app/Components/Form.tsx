"use client"
import React, { useState } from 'react';
import UploadImage from './UploadImage';
import UserTag from './UserTag';
import { useAuth } from '../Context/ContextAuth';
import { db , storage} from '../firebaseConfig';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { doc, setDoc , collection, getDocs, query, where } from 'firebase/firestore';
import { randomBytes } from 'crypto';
import { AiOutlineLoading3Quarters } from  "react-icons/ai";

import { useRouter } from 'next/navigation';
const Form = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [link, setLink] = useState('');
  const [file, setFile] = useState('');
  const [loading , setloading] = useState(false)
  const postId= Date.now().toString(); 

  const router = useRouter()
  

  console.log(file)
  const onSave = () => {
    setloading(true)
    uploadFile()  
  };

   
  const generateUniqueId = () => {
    const randomBytesBuffer = randomBytes(8);
    return randomBytesBuffer.toString('hex');
  };
 


  const uploadFile = () => {
    const storageRef = ref(storage , `pinterest/${file.name + generateUniqueId()}`)
     uploadBytes(storageRef , file).then((snapshot) => {
     }).then(resp=> {
         getDownloadURL(storageRef).then(async url=>  {
          const postData= {
            title:title, 
            desc: desc,
            link: link,
            image: url,
            userName:user.displayName,
            email: user.email ,
            userImage: user.photoURL,
            id:postId
          }
          await setDoc(doc(db , 'pinterest-post', postId), 
          postData).then(resp => { 
            setloading(true)
            router.push("/"+user.email)
          })
         })
     })
  }

  return (
    <div className='bg-white p-12 rounded-2xl max-w-full w-[83%] m-auto'>
      <div className='flex justify-end mb-6'>
        <button
         onClick={onSave}
         className='bg-red-500 p-2 text-white font-semibold px-3 rounded-lg'>
          {loading?  
           <AiOutlineLoading3Quarters
          src="/loading-indicator.png"
          width={30}
          height={30}
          alt='loading'
          className='animate-spin'
           />
           :<span>save</span>
          }
        </button>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-10'>
        <UploadImage setFile={(file) => setFile(file)}/>
        <div className='col-span-2'>
          <div className="w-[100%]">
            <input
              type='text'
              placeholder=' Add your title'
              onChange={(e) => setTitle(e.target.value)}
              className='text-[35px] outline-none font-bold w-full border-b-[0.5px] border-[#787878] placeholder-[#787878]'
            />
            <p className="text-[12px] w-full text-gray-40 flex justify-between text-gray-500 mb-5">
              Your first 40 characters are usually show up in feeds
              <span>100</span>
            </p>
            <UserTag  user={user}/>
            <textarea
              type="text"
              onChange={(e) => setDesc(e.target.value)}
              placeholder='Tell everyone what is your Pin is about'
              className='mt-5 border-b-[0.5px] pr-5 border-[#787878] placeholder-[#787878] outline-none w-full'
            />
            <input
              type="text"
              onChange={(e) => setLink(e.target.value)}
              placeholder='Add a destination link'
              className='outline-none w-full pb-4 mt-[90px] border-b-[0.5px] border-[#787878] placeholder-[#787878] relative top-16'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;