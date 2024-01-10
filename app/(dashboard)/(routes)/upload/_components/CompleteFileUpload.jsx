import Image from 'next/image';
import React from 'react'

const CompleteFileUpload = () => {
  return (
    <div className='h-full mt-20 flex flex-col items-center justify-center'>
        <Image src={'/success.gif'} width={200} height={200} alt='success'/>
        <h2 className='text-3xl font-medium'>File <strong className='text-primary'>Uploaded</strong> Successfully</h2>
    </div>
  )
}

export default CompleteFileUpload;