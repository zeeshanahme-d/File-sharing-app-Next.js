"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/nextjs';
import { Copy } from 'lucide-react';

import Alert from '../../../../_components/Alert'


const FileForm = ({ file, onPasswordSave, loading }) => {

  const [password, setPassword] = useState('');
  const [isPasswordEnabled, setIsPasswordEnabled] = useState(false);
  const [isDisabled, setisDisabled] = useState(true);
  const [message, setMessage] = useState({ show: false });

  useEffect(() => {
    setisDisabled(true);

  }, [isPasswordEnabled]);

  useEffect(() => {
    if (file?.password) {
      setIsPasswordEnabled(true);
      setPassword(file?.password);
    } else {
      setIsPasswordEnabled(false);
    }
  }, []);

  //on click copy
  const onClickCopy = () => {
    navigator.clipboard.writeText(file?.shortUrl);
    setMessage({
      status: 'Success',
      msg: 'Url Copied!',
      show: true,
    });
    setTimeout(() => {
      resetMessage();
    }, 2000)
  };

  const resetMessage = () => {
    setMessage({ show: false, });
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value.trim();
    setPassword(value);

    const showError = (msg) => {
      setisDisabled(true);
    };

    if (value.length < 3) {
      showError('Password must be at least 3 characters.');
    } else if (value.length > 10) {
      showError('Password must be no more than 10 characters.');
    } else {
      setisDisabled(false);
    }
  };


  return (
    <>
      {
        loading ? (
          <div className='w-full flex flex-col h-[500px] items-center border-blue-200 rounded-md border gap-5 py-5 px-2 animate-pulse'>
            <div className="w-3/4 h-5 bg-gray-300 rounded"></div>

            <div className="w-full">
              <div className="h-4 w-24 bg-gray-200 mb-2 rounded"></div>
              <div className="w-full h-10 bg-gray-200 rounded"></div>
            </div>

            <div className="w-full">
              <div className="flex gap-2 items-center mb-2">
                <div className="w-4 h-4 bg-gray-300 rounded"></div>
                <div className="h-4 w-40 bg-gray-200 rounded"></div>
              </div>
              <div className="flex gap-2">
                <div className="w-full h-10 bg-gray-200 rounded"></div>
                <div className="w-24 h-10 bg-gray-300 rounded"></div>
              </div>
            </div>

            <div className="w-full border-blue-200 rounded-md border p-5">
              <div className="h-4 w-40 bg-gray-200 mb-4 rounded"></div>
              <div className="w-full h-10 bg-gray-200 rounded mb-4"></div>
              <div className="w-full h-10 bg-gray-300 rounded"></div>
            </div>
          </div>
        ) : (
          <div className='w-full flex flex-col  h-[500px] items-center  border-blue-200 rounded-md border gap-5  py-5 px-2'>
            <p>Share URL to Anyone</p>
            {message.show && <div className='absolute top-0 right-0'>
              <Alert message={message} />
            </div>
            }

            <div className="w-full mb-6">
              <p className="mb-1 text-base font-medium text-gray-700">Short Url</p>
              <div className='relative '>
                <input type="text"
                  id="input-group-1"
                  className="w-full bg-gray-50 outline-none border border-gray-200 text-gray-900 text-base rounded-lg 
              block px-3 py-2" readOnly value={file?.shortUrl} />
                <Copy className='text-gray-400 hover:text-gray-600 active:text-gray-400 cursor-pointer absolute right-2 top-2'
                  onClick={onClickCopy} />
              </div>
            </div>

            <div className="w-full relative mb-6">
              <div className='flex gap-2 mb-1 items-center'>
                <input type="checkbox" onChange={(e) => { setIsPasswordEnabled(e.target.checked) }} />
                <p className='text-base font-medium text-gray-700'>Enable Password ?</p>
              </div>
              {isPasswordEnabled && <div className='flex gap-2'>
                <input
                  type="password"
                  id="input-group-2"
                  className="w-full bg-gray-50 outline-primary border border-blue-200 text-gray-900 text-base rounded-lg 
              block px-3 py-2"
                  placeholder='Password'
                  onChange={(e) => handlePasswordChange(e)} />
                <button
                  disabled={isDisabled}
                  className='bg-primary px-5 py-1 rounded-lg disabled:bg-gray-300 text-white active:bg-blue-600'
                  onClick={() => { onPasswordSave(password) }}>Save
                </button>
              </div>}
            </div>

            <div className="w-full relative mb-6 border-blue-200 rounded-md border p-5">
              <p className='mb-2 text-base font-medium text-gray-700'>Send File to Email.</p>
              <div>
                <input
                  type="email"
                  id="input-group-3"
                  disabled
                  className="w-full bg-gray-50 outline-primary border border-blue-200 text-gray-900 text-base rounded-lg 
          block px-3 py-2" placeholder='example@gmail.com' />
                <button disabled className='w-full mt-5 bg-primary px-5 py-1 rounded-lg text-white active:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed'>Send Email</button>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}

export default FileForm;