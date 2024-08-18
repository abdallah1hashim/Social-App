"use client";
import { useEffect, useState } from "react";
import Image from "next/image"; // Import Image from next/image if using Next.js
import ClearButton from "./ClearButton";

function ShowPhotoSelected({
  selectedFile,
  setFile,
}: {
  selectedFile: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
}) {
  const [fileUrl, setFileUrl] = useState<string | null>(null);

  let height = 0;
  useEffect(() => {
    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setFileUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setFileUrl(null);
    }
  }, [selectedFile]);

  const handleClearPhoto = () => {
    setFile(null);
    setFileUrl(null);
  };
  return (
    <>
      {fileUrl && (
        <div className="relative h-auto w-full py-4  overflow-hidden">
          <ClearButton onClick={handleClearPhoto} />
          <div className="rounded-md">
            <Image
              src={fileUrl}
              alt="Selected photo"
              width={0}
              height={0}
              objectFit="cover"
              className="w-full h-full rounded-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
}

export default ShowPhotoSelected;
