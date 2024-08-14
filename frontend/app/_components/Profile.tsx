import { EllipsisHorizontalIcon } from "@heroicons/react/16/solid";
import Button from "./Button";
import Avatar from "./Avatar";
import { useAuthContext } from "@/contexts/authContext";

function Profile() {
  const { user } = useAuthContext();
  return (
    <Button variant="hover" tabIndex={0} className="w-full">
      <Avatar pfp={user?.pfp} />
      <div className="flex flex-col ml-2 text-start">
        <span className="text-base-content">{user?.name}</span>
        <span className="text-base-content/60">@{user?.username}</span>
      </div>
      <div className=" flex justify-end text-end my-auto ml-auto">
        <EllipsisHorizontalIcon width={25} />
      </div>
    </Button>
  );
}

export default Profile;
