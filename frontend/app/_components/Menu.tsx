import React, { useState } from "react";

type Position =
  | "down"
  | "downEnd"
  | "top"
  | "topEnd"
  | "left"
  | "leftEnd"
  | "right"
  | "rightEnd";

export type MenuList = {
  onClick: () => void;
  className: string;
  content: string;
  permission?: boolean;
}[];

interface MenuT {
  Button: React.ReactNode;
  list: MenuList;
  position?: Position;
  className?: string;
}

const positionObj: Record<Position, string> = {
  down: "dropdown",
  downEnd: "dropdown dropdown-end",
  top: "dropdown dropdown-top",
  topEnd: "dropdown dropdown-top dropdown-end",
  left: "dropdown dropdown-left",
  leftEnd: "dropdown dropdown-left dropdown-end",
  right: "dropdown dropdown-right",
  rightEnd: "dropdown dropdown-right dropdown-end",
};

function Menu({ Button, list, position = "down", className = "" }: MenuT) {
  const [isOpen, setIsOpen] = useState(false);
  const menuClass = positionObj[position];

  return (
    <div className={`${menuClass} ${className} dropdown`}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        role="button"
        tabIndex={0}
        aria-haspopup="true"
        aria-expanded={isOpen}
      >
        {Button}
      </div>

      <ul
        tabIndex={0}
        className="dropdown-content z-10 menu p-2 shadow-lg bg-base-100 rounded-lg overflow-hidden w-56 max-h-80 overflow-y-auto border border-base-300 mb-3"
      >
        {list.map((el, index) => {
          if (el.permission === false) {
            return null;
          }
          return (
            <li
              key={index}
              className="hover:bg-base-200 rounded-md transition-colors duration-200"
            >
              <a
                className={`px-4 py-2 text-sm ${el.className || ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  el.onClick();
                  setIsOpen(false);
                }}
              >
                {el.content}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Menu;
