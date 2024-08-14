"use client";
import Button from "@/app/_components/Button";
import { useFormStatus } from "react-dom";

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} full={true}>
      {pending ? "Logining..." : "Login"}
    </Button>
  );
}

export default LoginButton;
