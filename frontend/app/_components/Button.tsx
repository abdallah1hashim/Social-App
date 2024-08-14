import React from "react";

type GeneralProps = React.ComponentPropsWithoutRef<"button"> & {
  children: React.ReactNode;
  className?: string;
};

type Variants = "primary" | "secondary" | "hover" | "icon" | "danger";
type Sizes = "small" | "small-rounded" | "medium" | "large" | "xl";

type ButtonProps = GeneralProps & {
  variant?: Variants;
  size?: Sizes;
  full?: boolean;
  iconColor?: string;
};

const getButtonClassNames = (
  variant?: Variants,
  size?: Sizes,
  className?: string,
  full?: boolean,
  iconColor?: string
) => {
  const baseClass =
    variant == "icon"
      ? "rounded-full"
      : "btn rounded-full disabled:bg-base-300 disabled:cursor-not-allowed text-center leading-none";
  const color = iconColor || "blue-500";
  const hoverColor = `hover:bg-${color}/10 hover:text-${color}`;
  let variantClass = "";
  let sizeClass = "";
  let fullClass = full ? "w-full" : "";

  switch (variant) {
    case "primary":
      variantClass = "bg-blue-500 hover:bg-blue-500/80";
      break;
    case "danger":
      variantClass = "bg-red-500 hover:bg-red-500/80";
      break;
    case "secondary":
      variantClass = "bg-gray-900 hover:bg-gray-800";
      break;
    case "hover":
      variantClass = "bg-base-100 border-base-100 h-fit p-3 flex";
      break;
    case "icon":
      variantClass = `border-none bg-base-100 rounded-full ${hoverColor} text-blue p-[9px]`;
      break;
    default:
      variantClass = "";
  }
  if (variant != "icon") {
    switch (size) {
      case "small":
        sizeClass = "py-1 px-3 text-sm";
        break;
      case "small-rounded":
        sizeClass = "w-12 h-12 p-0 text-sm";
        break;
      case "medium":
        sizeClass = "py-2 px-4 text-base";
        break;
      case "large":
        sizeClass = "py-3 px-6 text-lg";
        break;
      case "xl":
        sizeClass = "py-4 px-8 text-xl";
        break;
      default:
        sizeClass = "";
    }
  }

  return [baseClass, variantClass, sizeClass, fullClass, className]
    .filter(Boolean)
    .join(" ");
};

function Button({
  children,
  className,
  variant = "primary",
  size = "large",
  full = false,
  iconColor,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={getButtonClassNames(variant, size, className, full, iconColor)}
      {...rest}
    >
      {/* <div className=" hover:bg-blue-500/">yes</div> */}
      {children}
    </button>
  );
}
export default Button;
