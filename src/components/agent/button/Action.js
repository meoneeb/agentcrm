import { useState } from "react";

export default function ButtonAction({ agentProfile, companyProfile }) {
  const accent = companyProfile ? companyProfile.accent : "0, 0, 0"; // Default to black if no companyProfile
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const DefaultStyle = {};

  const HoverStyle = {
    color: `rgba(${accent}, 1)`,
    border: `2px solid rgba(${accent}, 1)`,
  };

  return (
    <div className="flex flex-row flex-wrap gap-4 grid grid-cols-1 md:grid-cols-3 ">
      {agentProfile.action.map((button, index) => (
        <a
          href={button.url}
          target="_blank"
          key={index}
          className="group flex flex-row justify-start items-center gap-4 px-8 py-6 border-2 border-solid border-neutral-200 rounded-xl shadow-xl shadow-neutral-300/30 hover:scale-105 transition-all cursor-pointer"
          style={hoveredIndex === index ? HoverStyle : DefaultStyle}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <i
            className={`fi ${button.icon} text-2xl`}
            style={{
              color:
                hoveredIndex === index
                  ? `rgba(${accent}, 1)`
                  : "rgba(107, 114, 128, 1)",
            }} // text-neutral-500 color
          ></i>
          <div className="flex flex-col">
            <p
              className="text-xl font-medium"
              style={{
                color:
                  hoveredIndex === index
                    ? `rgba(${accent}, 1)`
                    : "rgba(107, 114, 128, 1)",
              }} // text-neutral-500 color
            >
              {button.label}
            </p>
            <p
              className="text-neutral-500"
              // style={{
              //   color:
              //     hoveredIndex === index
              //       ? `rgba(${accent}, 1)`
              //       : "rgba(107, 114, 128, 1)",
              // }} // text-neutral-500 color
            >
              {button.label2}
            </p>
          </div>
        </a>
      ))}
    </div>
  );
}
