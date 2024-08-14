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

type VarriantT = "like" | "repost" | "comment";

type PostButtonProps = Omit<
  React.ComponentPropsWithoutRef<"button">,
  "onClick"
> & {
  varriant: VarriantT;
  count: number;
  onClick: () => void;
  isLiked?: boolean;
  secondOncllick?: () => void;
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
  varriant,
  count,
  onClick,
  isLiked,
  secondOncllick,
  className,
}: PostButtonProps) {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const IconComponent = iconComponents[varriant];
  const IconComponentSolid = iconComponentsSolid[varriant];
  const { bg, text } = colorClasses[varriant];
  return (
    <button
      className={`flex items-center space-x-[-2px] ${
        className ? className : ""
      }`}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      onClick={isLiked ? secondOncllick : onClick}
    >
      <span
        className={`w-8 h-8 p-2 rounded-full ${
          isHovered || isLiked ? `${text}` : ""
        } ${isHovered ? `${bg}` : ""}`}
      >
        {isLiked ? <IconComponentSolid /> : <IconComponent />}
      </span>
      <span className={`${isHovered ? text : ""}`}>{count}</span>
    </button>
  );
}
