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
     <iframe className="w-screen h-screen" style={{border: "none"}} src={temp.prototypeUrl}></iframe>
    </div>
  );
}
