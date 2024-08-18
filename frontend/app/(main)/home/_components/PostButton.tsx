"use client";
import {
  ArrowPathRoundedSquareIcon as ArrowPathRoundedOutline,
  ChatBubbleBottomCenterTextIcon as ChatOutline,
  HeartIcon as HeartOutline,
} from "@heroicons/react/24/outline";
import {
  ArrowPathRoundedSquareIcon as ArrowPathRoundedSolid,
  ChatBubbleBottomCenterTextIcon as ChatSolid,
  HeartIcon as HeartSolid,
} from "@heroicons/react/16/solid";
import { useState } from "react";

type variantT = "like" | "repost" | "comment";

type PostButtonProps = Omit<
  React.ComponentPropsWithoutRef<"button">,
  "onClick"
> & {
  variant: variantT;
  count: number;
  onClick?: () => void;
  isLiked?: boolean;
  className?: string;
};

const colorClasses = {
  comment: {
    bg: "bg-blue-500/20",
    text: "text-blue-500",
  },
  repost: {
    bg: "bg-green-500/20",
    text: "text-green-500",
  },
  like: {
    bg: "bg-red-500/20",
    text: "text-red-500",
  },
};

const iconComponents = {
  comment: ChatOutline,
  repost: ArrowPathRoundedOutline,
  like: HeartOutline,
};
const iconComponentsSolid = {
  comment: ChatSolid,
  repost: ArrowPathRoundedSolid,
  like: HeartSolid,
};

export default function PostButton({
  variant,
  count,
  onClick,
  isLiked,
  className,
}: PostButtonProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const IconComponent = iconComponents[variant];
  const IconComponentSolid = iconComponentsSolid[variant];
  const { bg, text } = colorClasses[variant];
  return (
    <button
      className={`flex items-center space-x-[-2px] ${className || ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick && onClick}
      type={onClick ? "button" : "submit"}
    >
      <span
        className={`w-8 h-8 p-1 rounded-full ${
          isHovered || isLiked ? text : ""
        } ${isHovered ? bg : ""}`}
      >
        {isLiked ? <IconComponentSolid /> : <IconComponent />}
      </span>
      <span className={(isHovered ? text : "") + " text-sm"}>{count}</span>
    </button>
  );
}
