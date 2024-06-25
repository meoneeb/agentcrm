"use client";

import { usePathname } from "next/navigation";
import AgentProfile from "@/components/agent/AgentProfile";
import { updatedAgentArr } from "@/data/agent"; // Ensure this path is correct
import Head from "next/head";

export default function AgentPage({ params }) {
  console.log(params, "params");
  const { company, agentid } = params;

  // Function to convert spaces to hyphens
  const username = (text) => {
    if (!text) {
      return "";
    }
    return text.toLowerCase().replace(/\s+/g, "-");
  };

  const agentProfile = updatedAgentArr.find(
    (value) => agentid === username(value.agentid) && company === username(value.company)
  );

  if (!agentProfile) {
    return <div>Agent not found</div>; // You can replace this with a custom 404 component
  }

  const fullname = `${agentProfile.firstname} ${agentProfile.lastname}`;
  const companyProfile = agentProfile.companyDetails; // Assuming company details are stored here

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icons/fav.png" />
        <meta property="og:site_name" content="figics.com" key="ogsitename" />
        <meta charSet="utf-8" />
        <meta name="description" content={fullname} />
        <meta property="og:title" content={`${fullname} | figics.com`} key="ogtitle" />
        <meta property="og:description" content={fullname} key="ogdesc" />
        <meta data-rh="true" name="twitter:card" content="summary_large_image" />
        <title>{`${fullname} | figics.com`}</title>
      </Head>
      <div className="fixed top-0 w-screen h-2" style={{background: `rgba(${companyProfile.accent}, 1)`}}></div>
      <AgentProfile companyProfile={companyProfile} agentProfile={agentProfile} />
    </>
  );
}
