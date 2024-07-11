import React from "react";

export default function SendMessage({ companyProfile, agentProfile }) {
  // Check if agentProfile exists before accessing its properties
  const fullName = agentProfile ? `${agentProfile.firstName} ${agentProfile.lastName}` : "Agent Name";
  const agentid = agentProfile ? agentProfile.agentid : "defaultAgentId";
  const company = companyProfile ? companyProfile.company : "defaultCompany";
  const companyName = companyProfile ? companyProfile.name : "Default Company";
  const accent = companyProfile ? companyProfile.accent : "0, 0, 0"; // Default to black if no companyProfile

  const agentLink = `https://flarepass.com/${company}/${agentid}`;

  const textMsg = `Hey, this is ${fullName} from ${companyName}. I look forward to working with you. Please tap the link below to save my contact details: ${agentLink}`;

  // Function to handle sending the message
  const sendMessage = () => {
    // Using the Web API to open the default SMS application
    window.open(`sms:&body=${encodeURIComponent(textMsg)}`, "_self");
  };

  const buttonStyle = {
    background: `rgba(${accent}, 1)`,
  };

  return (
    <div className="flex flex-col justify-end items-center h-full absolute right-12 bottom-14">
      <p className="bg-black text-white p-2 w-full">{textMsg}</p>
      <button
        className="w-12 h-12 rounded-full shadow-lg"
        style={buttonStyle}
        onClick={sendMessage}
      >
        <i className="fi fi-rr-redo text-white"></i>
      </button>
      <p className="text-xs font-semibold text-red-500 mt-2">
        Share
      </p>
    </div>
  );
}
