import React from "react";

export default function StyledButton({
  children,
  onClick,
  className,
  disabled,
  sec,
  ...props
}) {
  return (
    <button
      className={`flex flex-row px-12 py-4 gap-4 justify-center items-center ${
        sec
          ? "bg-blue-50 hover:bg-blue-600 border-2 border-solid border-blue-500 text-blue-600 hover:text-white font-medium"
          : "bg-blue-500 hover:bg-blue-600 text-white border-2 border-solid border-blue-500"
      } rounded-full focus:outline-none ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
