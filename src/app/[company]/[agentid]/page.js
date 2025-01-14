"use client";

import AgentProfile from "@/components/agent/AgentProfile";
import { updatedAgentArr } from "@/data/agent";

export default function AgentPage({ params }) {
  const { company, agentid } = params;

  const username = (text) => {
    if (!text) {
      return "";
    }
    return text.toLowerCase().replace(/\s+/g, "-");
  };

  const agentProfile = updatedAgentArr.find(
    (value) =>
      agentid === username(value.agentid) && company === username(value.company)
  );

  if (!agentProfile) {
    return <div>Agent not found</div>; // You can replace this with a custom 404 component
  }

  const fullname = `${agentProfile.firstname} ${agentProfile.lastname}`;
  const companyProfile = agentProfile.companyDetails;
  const favicon = companyProfile.favicon || "/icons/fav.png";
  const profileImg =
    agentProfile.img ||
    `https://placehold.co/150?text=${
      agentProfile.firstname[0] + agentProfile.lastname[0]
    }`;
  return (
    <>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={favicon} />
        <meta charSet="utf-8" />
        <meta name="description" content="" />
        <meta property="og:title" content={fullname} key="ogtitle" />
        <meta property="og:description" content="" key="ogdesc" />
        <meta property="og:image" content={profileImg} key="ogimage" />
        <meta name="twitter:image:src" content={profileImg} />
        <meta name="twitter:card" content="summary_large_image" />
        <title>{`${fullname} - ${companyProfile.name}`}</title>
      </head>
      <div>
        <AgentProfile
          companyProfile={companyProfile}
          agentProfile={agentProfile}
        />
      </div>
    </>
  );
}
