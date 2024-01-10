import Image from 'next/image';
import React, { useState } from 'react';
import { Download } from 'lucide-react';

const FileItem = ({ file }) => {
  const [userPassword, setUserPassword] = useState()


  return file && (
    <div className='h-[500px] bg-white rounded-lg flex flex-col items-center p-8'>
      <h1 className='text-xl'><strong className='text-primary'>{file?.userName}</strong> Shared file with You</h1>
      <p className='mt-5 text-sm text-gray-500'>Find File details below</p>

      <Image src={'/file.gif'} width={150} height={150} alt='' className='mt-10' />

      <div className='mt-10 flex gap-2 text-gray-600'>
        <div className='flex items-center'>
          <p>{file?.fileName}</p>
          <Image src={'/light.png'} width={20} height={10} alt='' className='w-[20px] h-[20px]' />
        </div>

        <div className='flex items-center'>
          <p>{file?.fileType}</p>
          <Image src={'/light.png'} width={20} height={10} alt='' className='w-[20px] h-[20px]' />
        </div>

        <div className='flex items-center'>
          <p>{(file?.fileSize / 1024 / 1024).toFixed(2)}MB</p>
          <Image src={'/light.png'} width={20} height={10} alt='' className='w-[20px] h-[20px]' />
        </div>
      </div>

      {file?.password.length > 3 && <div className='w-[300px] mt-5'>
        <input
          className='w-full border border-gray-500 outline-primary text-base p-2 rounded-lg'
          type="password"
          onChange={(e) => setUserPassword(e.target.value)}
          placeholder='Enter Password to Access the File' />
      </div>}

      <button
      onClick={()=>{window.open(file?.fileUrl)}}
       disabled={file?.password && userPassword !== file?.password}
        className='bg-primary disabled:bg-gray-500 disabled:cursor-not-allowed w-full flex justify-center items-center mt-5 p-2 rounded-full cursor-pointer text-white gap-2 text-lg active:bg-blue-600'>
        <Download />
        Download
      </button>

    </div>
  )
}

export default FileItem;