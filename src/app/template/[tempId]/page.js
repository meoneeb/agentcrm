import React from "react";
import { templates } from "@/data/templates";
export default function Page({ params }) {
  console.log(params, "params");

  const { tempId } = params;

  // Username function to format the tempId
  const username = (text) => {
    if (!text) {
      return "";
    }
    return text.toLowerCase().replace(/\s+/g, "-");
  };

  // Find the matching template using the transformed tempId
  const temp = templates.find((value) => tempId === username(value.tempId));

  // Handle the case where no matching template is found
  if (!temp) {
    return <div>Template not found</div>;
  }

  return (
    <div>
      <a href="/template" className="fixed top-4 left-4 bg-neutral-200 p-2 hover:bg-neutral-300 text-black font-semibold border border-black rounded shadow-xl cursor-pointer decoration-none">Go Back</a>
      <iframe
        className="w-screen h-screen"
        style={{ border: "none" }}
        src={temp.prototypeUrl}
        allowfullscreen
      ></iframe>
    </div>
  );
}
