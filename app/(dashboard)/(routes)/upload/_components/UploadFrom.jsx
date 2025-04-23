"use client"

import React, { useState } from 'react';
import AlertMsg from './AlertMsg';
import FilePreview from './FilePreview';
import ProgressBar from './ProgressBar';
import Loader from './Loader';




const UploadFrom = ({ uploadBtnClick, progress }) => {
    const [file, setFile] = useState();
    const [errorMsg, setErrorMsg] = useState();
    const [show, setShow] = useState(false);
    const [isDragging, setIsDragging] = useState(false);

    const onFileSelect = (file) => {
        if (file && file.size > 20_00_000) {
            setErrorMsg("File Size is Greater than 2 MB.");
            setTimeout(() => { setErrorMsg(null) }, 3000);
            return;
        } else {
            setFile(file);
        }
    };


    return (
        <div className='text-center'>

            <div
                onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    const droppedFile = e.dataTransfer.files[0];
                    onFileSelect(droppedFile);
                }}
                className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${isDragging ? "bg-blue-100 border-blue-600" : "bg-blue-50 border-blue-300"}`}
            >
                <input
                    id="dropzone-file"
                    onChange={(e) => onFileSelect(e.target.files[0])}
                    type="file"
                    className="hidden"
                />
                <label htmlFor="dropzone-file" className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <svg className="w-10 h-10 mb-4 text-blue-500" fill="none" viewBox="0 0 20 16">
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5A5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                    </svg>
                    <p className="mb-2 text-xl lg:text-3xl text-gray-500 text-center">
                        <span className="font-semibold">Click to upload</span> or <strong className='text-primary'>drag</strong> and <strong className='text-primary'>drop</strong>
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (Max Size 2MB)</p>
                </label>
            </div>

            {errorMsg && <AlertMsg msg={errorMsg} />}
            {file && <FilePreview file={file} removeFile={() => setFile(null)} />}

            {/* upload btn A=and progress bar  */}
            {progress ?
                <ProgressBar progress={progress} />
                :
                <button disabled={!file} className='relative h-[40px] p-2 bg-primary text-white w-60 rounded-full mt-5  cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-500'
                    onClick={() => {
                        uploadBtnClick(file)
                        setShow(true);
                    }}>
                    {!show ? <span>Upload</span> :
                        <span className='absolute top-1 left-24'>
                            <Loader />
                        </span>
                    }
                </button>
            }

        </div>

    )
}

export default UploadFrom;