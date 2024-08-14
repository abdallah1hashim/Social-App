"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentPropsWithRef } from "react";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  BellIcon,
  ChatBubbleLeftIcon,
} from "@heroicons/react/16/solid";
import Button from "./Button";
import Profile from "./Profile";
import Menu from "./Menu";
import { useAuthContext } from "@/contexts/authContext";
import toast from "react-hot-toast";
import LogoutButton from "../(auth)/_components/LogoutButton";

type SidebarProps = ComponentPropsWithRef<"nav"> & {
  className: string;
};

const links = [
  { href: "home", icon: HomeIcon },
  { href: "chat", icon: ChatBubbleLeftIcon },
  { href: "profile", icon: UserCircleIcon },
  { href: "notfication", icon: BellIcon },
  { href: "search", icon: MagnifyingGlassIcon },
];

function Sidebar({ className, ...rest }: SidebarProps) {
  const pathname = usePathname();
  const { logout } = useAuthContext();
  const menuList = [<LogoutButton key={0} />];

  return (
    <nav
      className={`flex justify-between flex-col h-dvh  border-r-2 border-base-200 p-4 ${className}`}
      {...rest}
    >
      <div>
        <Button variant="hover">
          <Link href="/home">WELCOME</Link>
        </Button>
        <ul className="flex flex-col gap-3 mt-6 ">
          {links.map((link) => (
            <li key={link.href}>
              <Button variant="hover">
                <Link
                  className="flex gap-3 items-center justify-center"
                  href={link.href}
                >
                  <span className="">
                    <link.icon width={26} />
                  </span>
                  <span>{link.href[0].toUpperCase() + link.href.slice(1)}</span>
                </Link>
              </Button>
            </li>
          ))}
        </ul>
        <Button className="flex items-center justify-center w-full mt-3">
          post
        </Button>
      </div>
      <Menu Button={<Profile />} list={menuList} position="right" />
    </nav>
  );
}

export default Sidebar;
