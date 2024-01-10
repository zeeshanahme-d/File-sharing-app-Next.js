"use client"

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
//components
import UploadFrom from './_components/UploadFrom';
import CompleteFileUpload from './_components/CompleteFileUpload';
import app from '../../../../firebaseConfig';
import { generateRandomString } from '../../../_utils/GenerateRandomString.js';


import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, setDoc, doc } from "firebase/firestore";




const Upload = () => {

  const [progress, setProgress] = useState();
  const [downloadUrl, setDownloadUrl] = useState();
  const [uploadComplete, setUploadComplete] = useState(false);
  const [fileDocId, setFileDocId] = useState();
  const router = useRouter();

  const storage = getStorage(app);
  const db = getFirestore(app);
  const { user } = useUser();


  // file upload handle function
  const uploadFileHandler = (file) => {
    const storageRef = ref(storage, `file-upload/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed',
      (snapshot) => {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        setProgress(progress);
      },
      (error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;
          case 'storage/canceled':
            // User canceled the upload
            break;
          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        // Upload completed successfully, now we can get the download URL
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          downloadURL && setDownloadUrl(downloadURL);
          downloadURL && saveInfo(file, downloadURL);
        });
      }
    );

  };



  //save info in firebase
  const saveInfo = async (file, fileUrl) => {
    const docId = generateRandomString().toString();
    setFileDocId(docId);
    try {
      await setDoc(doc(db, "fileUpload", docId), {
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        fileUrl: fileUrl,
        userEmail: user.primaryEmailAddress.emailAddress,
        userName: user.fullName,
        password: '',
        id: docId,
        shortUrl: process.env.NEXT_PUBLIC_BASE_URL + docId
      });
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    progress == 100 && setTimeout(() => {
      setUploadComplete(true);
    }, 2000)
  }, [!downloadUrl])


  useEffect(() => {
    uploadComplete && setTimeout(() => {
      setUploadComplete(false);
      router.push('/file-preview/' + fileDocId)
    }, 2000);
  }, [uploadComplete == true])



  return (
    <div className=' p-5 px-5 lg:px-28'>

      {!uploadComplete ?
        <div>
          <h2 className='text-2xl text-center m-5'>Start
            <strong className='text-primary'> Uploading </strong>
            File and <strong className='text-primary'> Share </strong> it
          </h2>
          <UploadFrom uploadBtnClick={(file) => uploadFileHandler(file)} progress={progress} />
        </div>
        :
        <CompleteFileUpload />
      }
    </div>
  )
}

export default Upload;