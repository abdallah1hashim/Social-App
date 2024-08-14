"use client";
import Avatar from "@/app/_components/Avatar";
import Button from "@/app/_components/Button";
import { useAuthContext } from "@/contexts/authContext";
import { useActionState, useEffect, useRef, useState } from "react";
import { UploadPhotoButton } from "./UploadIconsButton";
import Image from "next/image";
import ShowPhotoSelected from "./ShowPhotoSelected";
import TextInput from "./TextInput";
import { createPostAction } from "@/actions/PostActions";
import { useFormState, useFormStatus } from "react-dom";

function CreatePost() {
  const { user } = useAuthContext();
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { pending } = useFormStatus();

  function handleClick(): void {
    setIsOpened(true);
    inputRef.current?.focus();
  }

  return (
    <form
      onClick={handleClick}
      className="px-[16px] p-1 flex border border-base-200"
      action={createPostAction}
    >
      <div>
        <Avatar className="pt-3" pfp={user?.pfp} />
      </div>

      <div className="pl-4 w-full h-auto">
        {isOpened && (
          <div className="py-2">
            <select id="">
              <option value="">Permission</option>
            </select>
          </div>
        )}
        <div
          className={`flex flex-col justify-center pt-5  h-auto ${
            isOpened ? "py-9" : ""
          }  ${selectedFile ? "pb-2" : "pb-5"}`}
        >
          <TextInput ref={inputRef} />
        </div>

        <ShowPhotoSelected
          selectedFile={selectedFile}
          setFile={setSelectedFile}
        />
        <div
          className={`${
            isOpened ? "border-t" : "border-none"
          } border-base-300 py-2`}
        >
          <div className="p-1 flex justify-between">
            <div>
              <UploadPhotoButton setFile={setSelectedFile} />
            </div>
            <Button>Post</Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default CreatePost;
