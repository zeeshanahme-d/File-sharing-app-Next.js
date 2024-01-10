import Image from 'next/image';
import React from 'react'

const FileInfo = ({ file }) => {
  return (
    <div className='w-full flex flex-col justify-center items-center  border-blue-200 rounded-md border gap-5  p-10'>
      <Image src={file?.fileUrl ||'/file.png'} width={300} height={300} alt='' className=' object-contain rounded-lg' />
      <div className='mt-5'>
        <h2 className='text-left text-xl'>{file?.fileName}</h2>
        <h2 className='text-base text-gray-400'>{file?.fileType} / {(file?.fileSize / 1024 / 1024).toFixed(2)}MB</h2>
      </div>
    </div>
  )
}

export default FileInfo;