import { useState } from "react";

export default function ActionBar({ agentProfile, companyProfile }) {
  const accent = companyProfile ? companyProfile.accent : "0, 0, 0"; // Default to black if no companyProfile
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const DefaultStyle = {};

  const HoverStyle = {
    color: `rgba(${accent}, 1)`,
  };

  return (
    <div className="flex flex-row justify-around flex-wrap grid grid-cols-4 px-2 py-4 bg-white border-t border-solid border-neutral-200">
      {agentProfile.action.map((button, index) => (
        <a
          href={button.url}
          target="_blank"
          key={index}
          className="group flex flex-col justify-start items-center gap-0 hover:scale-105 transition-all cursor-pointer"
          style={hoveredIndex === index ? HoverStyle : DefaultStyle}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <i
            className={`fi ${button.icon} text-xl`}
            style={{
              color:
                hoveredIndex === index
                  ? `rgba(${accent}, 1)`
                  : "rgba(107, 114, 128, 1)",
            }}
          ></i>
            <p
              className="text-xs font-semibold"
              style={{
                color:
                  hoveredIndex === index
                    ? `rgba(${accent}, 1)`
                    : "rgba(107, 114, 128, 1)",
              }}
            >
              {button.label}
            </p>
        </a>
      ))}
    </div>
  );
}
