"use client"
import React, { useState } from 'react'
import { HiArrowUpCircle } from "react-icons/hi2";
const UploadImage = ({setFile}) => {
  const [selectedFile , setselectedFile] = useState()
  
  return (
    <div className='h-[480px] bg-[#e9e9e9] rounded-lg'>
        <label className='m-5 flex flex-col justify-center items-center
        cursor-pointer h-[90%] 
        border-[2px] border-gray-300 border-dashed rounded-lg text-gray-600 '>

          {!selectedFile?
          <div className=''>
           <HiArrowUpCircle className="text-[22px]  m-auto " />
           <h2 className="font-semibold  text-center relative top-5">Drag and drop or click to upload</h2>
           </div>
          :null}
          {selectedFile?
          <img src={window.URL.createObjectURL(selectedFile)}
          width={500}
          height={800}
          className='object-contain h-[90%]'
          alt="" />
          :null}
           <input className='hidden'
            type="file"
            id="dropzone-file"
            required
            onChange={
              (e) => {setFile(e.target.files[0]);
              setselectedFile(e.target.files[0])}}
            />
        </label>
    </div>
  )
}

export default UploadImage