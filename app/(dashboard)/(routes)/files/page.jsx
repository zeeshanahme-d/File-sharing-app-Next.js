"use client"
import { UserButton, useUser } from '@clerk/nextjs'
import React, { useEffect, useState } from 'react'
import { collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import app from './../../../../firebaseConfig'
import TotalFileCard from './_components/TotalFileCard'
import FileList from './_components/FileList'
import Link from 'next/link';



function Files() {


  const db = getFirestore(app);
  const { user } = useUser();
  const [fileList, setFileList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    user && getAllUserFiles();
  }, [user]);


  const getAllUserFiles = async () => {
    setLoading(true);
    const q = query(collection(db, "fileUpload"),
      where("userEmail", "==", user.primaryEmailAddress.emailAddress));
    const querySnapshot = await getDocs(q);
    setFileList([]);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      setFileList(fileList => [...fileList, doc.data()]);
    });
    setLoading(false);
  };

  const handleParentApi = (data) => {
    getAllUserFiles();
  }


  return (
    <div className='p-5'>
      <h2 className='text-[20px]'>My Files</h2>

      {loading ?
        <>
          <div className="overflow-x-auto mt-7">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead className="text-left">
                <tr>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">File Name</th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"> Type</th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Size</th>
                  <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900"></th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {Array.from({ length: 10 }).map((_, index) => (
                  <tr key={index} className="animate-pulse odd:bg-gray-50">
                    <td className="whitespace-nowrap px-4 py-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-2">
                      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-2">
                      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-end">
                      <div className="inline-block h-8 w-20 bg-gray-300 rounded mr-2"></div>
                      <div className="inline-block h-8 w-20 bg-gray-300 rounded"></div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
        :
        <>
          {fileList.length == 0 ?
            <div className='flex justify-center items-center py-32 flex-col'>
              <h2 className='mb-5 text-3xl'> You don't have any File</h2>
              <Link href={process.env.NEXT_PUBLIC_DOMAIN}
                className='p-2 text-white bg-primary rounded-md mt-7'>
                Upload Now
              </Link>
            </div> : <>
              <TotalFileCard totalFile={fileList?.length} />
              <FileList fileList={fileList} setLoader={setLoading} handleParentApi={handleParentApi} />
            </>
          }
        </>
      }
    </div>
  )
}

export default Files;