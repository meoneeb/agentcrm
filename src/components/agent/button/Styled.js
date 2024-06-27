import React, { useState } from "react";

export default function StyledButton({
  children,
  onClick,
  className,
  disabled,
  outlined,
  companyProfile,
  ...props
}) {
  const [isHovered, setIsHovered] = useState(false);

  const DefaultStyle = {};

  const HoverStyle = {};

  return (
    <button
      className={`flex flex-row px-12 h-12 gap-4 justify-center items-center rounded-xl  font-medium  focus:outline-none ${className}
      ${
        outlined
          ? "text-zinc-800 bg:-white hover:text-white hover:bg-zinc-900 border border-2 border-zinc-800"
          : "text-white bg-zinc-800 hover:bg-zinc-900"
      }
      ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      style={isHovered ? HoverStyle : DefaultStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
