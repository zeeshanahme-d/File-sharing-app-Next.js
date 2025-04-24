import { deleteDoc, doc, getFirestore } from 'firebase/firestore';
import { getStorage, ref, deleteObject } from "firebase/storage";
import app from '../../../../../firebaseConfig';
import Link from 'next/link'
import React from 'react'

function FileList({ fileList, setLoader, handleParentApi }) {

    const handleDeleteDoc = async (file) => {
        setLoader(true);
        const db = getFirestore(app);
        const docRef = doc(db, "fileUpload", file?.id);

        try {
            await deleteDoc(docRef);
            console.log("Document successfully deleted!");
            handleParentApi(file);
            await handleDeleteFile(file?.fileName);
        } catch (error) {
            console.error("Error removing document: ", error);
        }
    };

    const handleDeleteFile = async (fileName) => {
        const storage = getStorage();
        const fileRef = ref(storage, `file-upload/${fileName}`); // make sure fileName includes folder path if any

        try {
            await deleteObject(fileRef);
            console.log("File successfully deleted!");
        } catch (error) {
            console.error("Error removing file: ", error);
        }
    };


    return fileList && (
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
                    {fileList.map((file, index) => (
                        <tr className="odd:bg-gray-50" key={index}>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{file.fileName}</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{file.fileType}</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700">{(file.fileSize / 1024 / 1024).toFixed(2)}MB</td>
                            <td className="whitespace-nowrap px-4 py-2 text-gray-700 text-end">
                                <button className='cursor-pointer bg-error text-white px-5 py-2 rounded-md mr-2 hover:bg-[#ae2f26] transition-all duration-300' onClick={() => handleDeleteDoc(file)}>
                                    Delete
                                </button>
                                <Link
                                    href={'/file-preview/' + file?.id}
                                    className='cursor-pointer bg-primary text-white px-5 py-2 rounded-md hover:bg-[#185089] transition-all duration-300'>View
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default FileList