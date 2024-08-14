import Button from "@/app/_components/Button";
import { PhotoIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";

export function UploadPhotoButton({
  setFile,
}: {
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const onClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    inputRef.current?.click();
  };
  const handleChange = () => {
    if (inputRef.current?.files?.length) {
      setFile(inputRef.current.files[0]);
    }
  };
  return (
    <Button onClick={onClick} variant="icon" size="small" type="button">
      <PhotoIcon width={24} />
      <input
        name="photo"
        onChange={handleChange}
        type="file"
        className="hidden"
        accept="image/png, image/gif, image/jpeg"
        ref={inputRef}
      />
    </Button>
  );
}
