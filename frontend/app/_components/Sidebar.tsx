"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentPropsWithRef } from "react";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  UserCircleIcon,
  BellIcon,
  ChatBubbleLeftIcon,
  PencilSquareIcon,
} from "@heroicons/react/16/solid";
import Button from "./Button";
import Profile from "./Profile";
import Menu from "./Menu";
import { useAuthContext } from "@/contexts/authContext";

type SidebarProps = ComponentPropsWithRef<"nav"> & {
  className?: string;
};

const links = [
  { href: "/home", icon: HomeIcon, label: "Home" },
  { href: "/chat", icon: ChatBubbleLeftIcon, label: "Chat" },
  { href: "/profile", icon: UserCircleIcon, label: "Profile" },
  { href: "/notification", icon: BellIcon, label: "Notifications" },
  { href: "/search", icon: MagnifyingGlassIcon, label: "Search" },
];

function Sidebar({ className = "", ...rest }: SidebarProps) {
  const pathname = usePathname();
  const { logout, user } = useAuthContext();

  const menuList = [
    {
      onClick: () => logout(),
      className: "text-red-500 w-full",
      content: "Logout",
      permission: true,
    },
  ];

  return (
    <nav
      className={`flex justify-between flex-col h-dvh border-r-2 border-base-200 p-4 ${className}`}
      {...rest}
    >
      <div className="flex flex-col justify-between h-full">
        <div>
          <Button variant="hover">
            <Link href="/home">WELCOME</Link>
          </Button>
          <ul className="flex flex-col gap-3 mt-6">
            {links.map((link) => (
              <li key={link.href}>
                <Button variant="hover">
                  <Link
                    className={`flex gap-3 items-center justify-center ${
                      pathname === link.href ? "text-blue-500" : ""
                    }`}
                    href={link.href}
                  >
                    <link.icon className="w-6 h-6" />
                    <span>{link.label}</span>
                  </Link>
                </Button>
              </li>
            ))}
          </ul>
          <Button className="flex items-center justify-center w-full mt-3 gap-2">
            <PencilSquareIcon className="w-5 h-5" />
            <span>New Post</span>
          </Button>
        </div>
        <Menu Button={<Profile />} list={menuList} position="top" />
      </div>
    </nav>
  );
}

export default Sidebar;
