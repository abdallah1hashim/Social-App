import defaultPfp from "@/public/userPfp.webp";
import Image from "next/image";

type AvatarProps = React.ComponentPropsWithoutRef<"div"> & {
  className?: string;
  pfp?: string | null;
};

function Avatar({ className, pfp = null, ...rest }: AvatarProps) {
  return (
    <div className={`avatar ${className ? className : ""}`} {...rest}>
      <div className="w-11 rounded-full">
        <Image
          alt="user profile picture"
          height="40"
          width="40"
          src={pfp ? pfp : defaultPfp}
        />
      </div>
    </div>
  );
}

export default Avatar;
