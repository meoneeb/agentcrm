"use client";
import { useState } from "react";

export default function EmailButton({ companyProfile, agentProfile }) {
  const [hover, setHover] = useState(false);
  const emailurl = `mailto:${agentProfile.email}`;
  const accent = companyProfile ? companyProfile.accent : "0, 0, 0"; // Default to black if no companyProfile

  const DefaultStyle = {
    color: "rgba(107, 114, 128, 1)",
  };

  const HoverStyle = {
    color: `rgba(${accent}, 1)`,
  };

  return (
    <a
      href={emailurl}
      target="_blank"
      className="group flex flex-col justify-center items-center gap-0 hover:scale-105 transition-all cursor-pointer self-center"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <i
        className={`fi fi-rr-envelope text-xl`}
        style={hover ? HoverStyle : DefaultStyle}
      ></i>
      <p
        className="text-xs font-semibold"
        style={hover ? HoverStyle : DefaultStyle}
      >
        Email
      </p>
    </a>
  );
}
