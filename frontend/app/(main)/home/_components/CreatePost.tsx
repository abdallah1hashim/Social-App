"use client";
import Avatar from "@/app/_components/Avatar";
import Button from "@/app/_components/Button";
import { useAuthContext } from "@/contexts/authContext";
import { useRef, useState } from "react";
import { UploadPhotoButton } from "./UploadIconsButton";
import ShowPhotoSelected from "./ShowPhotoSelected";
import TextInput from "./TextInput";
import { createPostAction } from "@/actions/PostActions";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";
import { CreatePostFormSchema } from "@/lib/Validators";

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
  async function handleSubmit(formData: FormData) {
    const content = formData.get("content") as string;
    const validatedFields = CreatePostFormSchema.safeParse({
      content: content,
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }
    // Remove empty photo field
    if (
      !formData.has("photo") ||
      (formData.get("photo") instanceof File &&
        (formData.get("photo") as File).size === 0)
    ) {
      formData.delete("photo");
    }
    let tempPhotoUrl: string | null = null;

    if (formData.get("photo") instanceof File) {
      tempPhotoUrl = URL.createObjectURL(formData.get("photo") as File);
    }
    // const optimisticPost: PostT = {
    //   pk: 99999,
    //   content,
    //   photo:
    //     formData.get("photo") instanceof File
    //       ? URL.createObjectURL(formData.get("photo") as File)
    //       : (formData.get("photo") as string | null),
    //   author: user as PublicUserT,
    //   is_liked: false,
    //   comments_count: 0,
    //   comment_for: null,
    //   likes_count: 0,
    //   updated_at: new Date().toISOString(),
    //   created_at: new Date().toISOString(),
    // };

    const result = await createPostAction(formData);

    if (result.errors) {
      if ("form" in result.errors) {
        toast.error(result.errors.form);
      } else {
        toast.error("An unexpected error occurred.");
      }
      console.error("Submission errors:", result.errors); // Add this line for debugging
    } else if (result.success) {
      toast.success("Post created successfully!");
      setIsOpened(false);
      setSelectedFile(null);
      if (tempPhotoUrl) {
        URL.revokeObjectURL(tempPhotoUrl);
      }
      if (inputRef.current) inputRef.current.value = "";
    } else {
      toast.error("An unexpected response was received.");
      console.error("Unexpected response:", result); // Add this line for debugging
    }
  }

  return (
    <form
      onClick={handleClick}
      className="px-[16px] p-1 flex border border-base-200"
      action={handleSubmit}
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
            <Button disabled={pending} type="submit">
              Post
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default CreatePost;
