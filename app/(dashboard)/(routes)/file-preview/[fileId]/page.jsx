"use client"

import React, { useEffect, useState } from 'react';
import { ArrowLeftSquare } from 'lucide-react'

//firebase
import app from '../../../../../firebaseConfig';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import Link from 'next/link';

//components
import FileInfo from './_components/FileInfo';
import FileForm from './_components/FileForm';
import Alert from '../../../_components/Alert';



const FilePreview = ({ params }) => {
    const [file, setFile] = useState();
    const [message, setMessage] = useState({show: false});


    useEffect(() => {
        console.log(params.fileId);
        params?.fileId && getFileInfo()

    }, []);

    const db = getFirestore(app);
    const getFileInfo = async () => {
        const docRef = doc(db, "fileUpload", params?.fileId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setFile(docSnap.data());
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    };


    const onPasswordSave = async (password) => {
        console.log("password:", password)

        const docRef = doc(db, "fileUpload", params.fileId);
        await updateDoc(docRef, {
            password: password
        });
        setMessage({
            status: 'Success',
            msg: 'Password saved successfully!',
            show: true,
        });
        setTimeout(() => {
            setMessage({
                show: false,
            });
        }, 2000)
    };

    return (
        <div className='w-full p-5 xl:px-28'>
            {message.show && <div className='absolute top-0 right-0'>
                <Alert message={message} />
            </div>
            }
            <Link href={'/upload'} className='flex font-medium gap-1 hover:text-primary'>
                <ArrowLeftSquare />
                Go to Upload
            </Link>
            <div className='flex-col items-center justify-center flex gap-3 md:flex-row mt-10'>
                <FileInfo file={file} />
                <FileForm file={file} onPasswordSave={(password) => onPasswordSave(password)} />
            </div>
        </div>
    )
}

export default FilePreview;