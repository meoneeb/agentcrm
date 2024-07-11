import { useState } from "react";
import SendMessage from "./SendMessage";

export default function ActionBar({ agentProfile, companyProfile }) {
  const accent = companyProfile ? companyProfile.accent : "0, 0, 0"; // Default to black if no companyProfile
  const [hoveredCompanyIndex, setHoveredCompanyIndex] = useState(null);
  const [hoveredAgentIndex, setHoveredAgentIndex] = useState(null);

  const DefaultStyle = {};

  const HoverStyle = {
    color: `rgba(${accent}, 1)`,
  };

  return (
    <div className="flex flex-row justify-center items-center flex-wrap grid grid-cols-3 pt-4 px-8 pb-8 bg-white border-t border-solid border-neutral-200">
      {companyProfile?.action?.map((button, index) => (
        <a
          href={button.url}
          target="_blank"
          key={index}
          className="group flex flex-col justify-center items-center gap-0 hover:scale-105 transition-all cursor-pointer self-center"
          style={hoveredCompanyIndex === index ? HoverStyle : DefaultStyle}
          onMouseEnter={() => setHoveredCompanyIndex(index)}
          onMouseLeave={() => setHoveredCompanyIndex(null)}
        >
          <i
            className={`fi ${button.icon} text-xl`}
            style={{
              color:
                hoveredCompanyIndex === index
                  ? `rgba(${accent}, 1)`
                  : "rgba(107, 114, 128, 1)",
            }}
          ></i>
          <p
            className="text-xs font-semibold"
            style={{
              color:
                hoveredCompanyIndex === index
                  ? `rgba(${accent}, 1)`
                  : "rgba(107, 114, 128, 1)",
            }}
          >
            {button.label}
          </p>
        </a>
      ))}
      {agentProfile?.action?.map((button, index) => (
        <a
          href={button.url}
          target="_blank"
          key={index}
          className="group flex flex-col justify-center items-center gap-0 hover:scale-105 transition-all cursor-pointer self-center"
          style={hoveredAgentIndex === index ? HoverStyle : DefaultStyle}
          onMouseEnter={() => setHoveredAgentIndex(index)}
          onMouseLeave={() => setHoveredAgentIndex(null)}
        >
          <i
            className={`fi ${button.icon} text-xl`}
            style={{
              color:
                hoveredAgentIndex === index
                  ? `rgba(${accent}, 1)`
                  : "rgba(107, 114, 128, 1)",
            }}
          ></i>
          <p
            className="text-xs font-semibold"
            style={{
              color:
                hoveredAgentIndex === index
                  ? `rgba(${accent}, 1)`
                  : "rgba(107, 114, 128, 1)",
            }}
          >
            {button.label}
          </p>
        </a>
      ))}
      <SendMessage
        agentProfile={agentProfile}
        companyProfile={companyProfile}
      />
    </div>
  );
}
