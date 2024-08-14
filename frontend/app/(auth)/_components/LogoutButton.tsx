import Button from "@/app/_components/Button";
import { useAuthContext } from "@/contexts/authContext";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

function LogoutButton() {
  const { logout } = useAuthContext();
  const handleClick = () => {
    logout();
    toast.success("logged out");
    redirect("/login");
  };
  return (
    <Button variant="danger" onClick={handleClick}>
      Logout
    </Button>
  );
}

export default LogoutButton;
