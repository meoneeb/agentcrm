import React from "react";

export default function SendMessage({ companyProfile, agentProfile }) {
  const accent = companyProfile?.accent || "0, 0, 0"; // Default to black if no companyProfile
  const agentName = `${agentProfile.firstName} ${agentProfile.lastName}`;
  const agentUrl = `https://flarepass.com/${companyProfile.company}/${agentProfile.agentid}`;
  const companyName = companyProfile.name;
  // Function to handle sending the message
  const sendMessage = () => {
    // Using the Web API to open the default SMS application
    window.open(`sms:&body=${encodeURIComponent(predefinedText)}`, "_self");
  };
  const predefinedText = `Hey, this is ${agentName} from ${companyName} I look forward to working with you. Please tap the link below to save my contact details: ${agentUrl} .`;
  // Additionally, we have an exclusive offer that I believe will be of great interest to you. Feel free to reach out to discuss further.
  const buttonStyle = {
    background: `rgba(${accent}, 1)`,
    boxShadow: `0px 6px 20px -8px rgba(${accent}, 1)`,
  };

  const textStyle = {
    color: `rgba(${accent}, 1)`,
  };

  return (
    <div className="flex flex-col gap-2 justify-end items-center h-full absolute right-12 bottom-8">
      <p className="p-2 bg-white text-black">{predefinedText}</p>
      <button
        className="min-w-12 min-h-12 rounded-full shadow-lg"
        style={buttonStyle}
        onClick={sendMessage}
      >
        <i className="fi fi-rr-redo text-white"></i>
      </button>
      <p className="text-xs font-semibold" style={textStyle}>
        Share the message
      </p>
    </div>
  );
}
