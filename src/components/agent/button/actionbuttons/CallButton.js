"use client";
import { useState } from "react";

export default function CallButton({ company, user }) {
  const [hover, setHover] = useState(false);

  const isUserPrime = company?.isUserPrime ?? false;
  const dialCode = company?.countrycode ?? "";
  const ext = user?.ext ?? "";
  
  const userPhone = user?.cellphone ? `${dialCode}${user.cellphone}` : "";
  const companyPhone = company?.workphone ? `${dialCode}${company.workphone}` : "";

  const phoneExtUrl =
    companyPhone ||
    (userPhone ? `${userPhone}${ext ? `,${ext}` : ""}` : "");

  const phoneUrl = isUserPrime
    ? userPhone
      ? `tel:${userPhone}`
      : companyPhone
      ? `tel:${companyPhone}`
      : "#"
    : phoneExtUrl
    ? `tel:${phoneExtUrl}`
    : "#"; // Prevent empty tel links

  const accent = company?.accent ?? "0, 0, 0"; // Default to black if no company

  const DefaultStyle = {
    color: "rgba(107, 114, 128, 1)",
  };

  const HoverStyle = {
    color: `rgba(${accent}, 1)`,
  };

  return (
    <a
      href={phoneUrl}
      target={phoneUrl !== "#" ? "_blank" : "_self"}
      className="group flex flex-col justify-center items-center gap-0 hover:scale-105 transition-all cursor-pointer self-center"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <i
        className="fi fi-rr-phone-call text-xl"
        style={hover ? HoverStyle : DefaultStyle}
      ></i>
      <p className="text-xs font-semibold" style={hover ? HoverStyle : DefaultStyle}>
        Call
      </p>
    </a>
  );
}
