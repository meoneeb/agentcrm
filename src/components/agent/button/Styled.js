import React, { useState } from "react";

export default function StyledButton({
  children,
  onClick,
  className,
  disabled,
  companyProfile,
  ...props
}) {
  const accent = companyProfile ? companyProfile.accent : "0, 0, 0"; // Default to black if no companyProfile
  const [isHovered, setIsHovered] = useState(false);

  const DefaultStyle = {
    height: 48,
  };

  const HoverStyle = {
    height: 48,
  };

  return (
    <button
      className={`flex flex-row px-12 gap-4 justify-center items-center rounded-xl text-white font-medium bg-zinc-800 hover:bg-zinc-900 focus:outline-none ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
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
