import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const FileInfo = ({ file }) => {

  const renderPreview = () => {
    if (file?.fileType?.startsWith("image")) {
      return (
        <Image
          src={file?.fileUrl || "/file.png"}
          width="100%"
          height="100%"
          alt="uploaded"
          className="object-contain rounded-lg"
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

  return (
    <div className="w-full h-[500px] flex flex-col justify-center items-center border-blue-200 rounded-md border gap-5 p-10">
      {renderPreview()}
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
