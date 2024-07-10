import React from "react";

export default function SendMessage({ companyProfile }) {
  const accent = companyProfile ? companyProfile.accent : "0, 0, 0"; // Default to black if no companyProfile

  // Function to handle sending the message
  const sendMessage = () => {
    const predefinedText = "Hello, this is the predefined text!"; // Your predefined text

    // Using the Web API to open the default SMS application
    window.open(`sms:&body=${encodeURIComponent(predefinedText)}`, "_self");
  };
  const Style = {
    background: `rgba(${accent}, 1)`,
  };
  return (
    <div className="flex flex-col justify-end items-center h-full ">
      <button
        className="w-12 h-12 rounded-full absolute right-12 bottom-14 shadow-lg shadow-red-400"
        style={Style}
        onClick={sendMessage}
      >
        <i className="fi fi-rr-redo text-white"></i>
      </button>
      <p
        // style={{ color: "rgba(107, 114, 128, 1)" }}
        className="text-xs font-semibold text-red-500"
      >
        Share
      </p>
    </div>
  );
}
