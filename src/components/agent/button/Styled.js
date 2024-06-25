import React, { useState } from "react";

export default function StyledButton({
  children,
  onClick,
  className,
  disabled,
  sec,
  companyProfile,
  ...props
}) {
  const accent = companyProfile ? companyProfile.accent : "0, 0, 0"; // Default to black if no companyProfile
  const [isHovered, setIsHovered] = useState(false);

  const DefaultStyle = {
    backgroundColor: sec ? `rgba(${accent}, 0.05)` : `rgba(${accent}, 1)`,
    color: sec ? "rgba(0, 0, 255, 1)" : "white",
    border: `2px solid rgba(${accent}, 1)`,
    color: sec ? `rgba(${accent}, 1)` : "white"
  };

  const HoverStyle = {
    backgroundColor: sec ? `rgba(${accent}, 1)` : `rgba(${accent}, 1)`,
    color: sec ? "white" : "white",
    border: `2px solid rgba(${accent}, 1)`,
    color: "white"
  };

  return (
    <button
      className={`flex flex-row px-12 py-4 gap-4 justify-center items-center ${
        sec ? "font-medium" : "text-white"
      } rounded-full focus:outline-none ${className} ${
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
