import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const FileInfo = ({ file, loading = false }) => {

  const renderPreview = () => {
    if (file?.fileType?.startsWith("image")) {
      return (
        <Image
          src={file?.fileUrl || "/file.png"}
          alt="uploaded"
          className="object-contain rounded-lg w-full h-full"
          width={500}
          height={500}
        />
      );
    } else if (file?.fileType === "application/pdf") {
      return (
        <iframe
          src={file.fileUrl}
          width="100%"
          height="100%"
          className="rounded-lg"
          title="PDF Preview"
        />
      );
    } else {
      return (
        <div className="text-center">
          <Image src="/file.png" width={100} height={100} alt="file icon" />
          <p className="mt-2 text-gray-500">No preview available for this file type</p>
        </div>
      );
    }
  };

  if (loading) {
    return (
      <div className="w-full h-[500px] flex flex-col justify-between items-center border-blue-200 rounded-md border p-8 animate-pulse">
        <div className="w-full h-[350px] flex items-center justify-center bg-gray-200 rounded-lg"></div>
        <div className="mt-5 w-full text-left space-y-2">
          <div className="w-1/2 h-5 bg-gray-300 rounded"></div>
          <div className="w-1/3 h-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[500px] flex flex-col justify-between items-center border-blue-200 rounded-md border p-8">
      <div className='w-full h-[350px] flex items-center justify-center'>
        {renderPreview()}
      </div>
      <div className="mt-5 w-full text-left">
        <h2 className="text-xl">{file?.fileName}</h2>
        <h2 className="text-base text-gray-400">
          {file?.fileType} / {(file?.fileSize / 1024 / 1024).toFixed(2)} MB
        </h2>
      </div>
    </div>
  );
};


export default FileInfo;
