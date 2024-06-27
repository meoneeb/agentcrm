"use client";
import React, { useEffect } from "react";

const ScreenModal = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <div
      className={`fixed inset-0 z-50 flex justify-end duration-700 ${
        isOpen ? "opacity-100" : "opacity-100 pointer-events-none"
      }`}
      onClick={onClose}
    >
      <div
        className={`relative bg-white w-full h-full shadow-lg transform transition-transform duration-700 ease-in-out ${
          isOpen ? "md:translate-y-0 md:translate-x-0 translate-x-0" : "md:-translate-y-full md:translate-x-0 translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute w-8 h-8 top-4 right-8 text-2xl font-bold rounded-full text-gray-500 hover:text-zinc-900 flex justify-center items-center border-2 border-solid hover:border-zinc-900"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="md:p-6 p-2">{children}</div>
      </div>
    </div>
  );
};

export default ScreenModal;
