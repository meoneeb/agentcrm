"use client";

import AgentProfile from "@/components/agent/AgentProfile";
import { updatedAgentArr } from "@/data/agent"; // Ensure this path is correct
import { companyArr } from "@/data/company";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AgentPage({ params }) {
  console.log(params, "params");
  const { company, agentid } = params;

  const [agent, setAgent] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const response = await axios.get(
          `/api/agent/get-agent?agentid=${agentid}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setAgent(response.data.agent);
        setError("");
      } catch (err) {
        setAgent(null);
        setError(err.response ? err.response.data.message : err.message);
      }
    };

    if (agentid) {
      fetchAgent();
    }
  }, [agentid]);

  console.log(agent, "agent");

  // Function to convert spaces to hyphens
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
    // return <div>Agent not found</div>; // You can replace this with a custom 404 component
  }

  function mergeCompanyData( companyArr) {
    const company = companyArr.find((c) => c.company === agent?.company);
    if (company && agent) {
      return {
        ...agent,
        companyDetails: company,
      };
    }
    return agent;
  }
  
  const updatedAgentArrrrr = mergeCompanyData(companyArr);
  const fullname = `${updatedAgentArrrrr?.firstname} ${updatedAgentArrrrr?.lastname}`;
  const companyProfile = updatedAgentArrrrr?.companyDetails;
  console.log(updatedAgentArrrrr, '===')
  return (
    <>
      {/* <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icons/fav.png" />
        <meta charSet="utf-8" />
        <meta name="description" content="" />
        <meta property="og:title" content={fullname} key="ogtitle" />
        <meta property="og:description" content="" key="ogdesc" />
        <meta
          property="og:image"
          content={`https://www.flarepass.com${companyProfile.logo}`}
          key="ogimage"
        />
        <meta
          name="twitter:image:src"
          content={`https://www.flarepass.com${companyProfile.logo}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <title>{`${fullname} - ${companyProfile.name}`}</title>
      </head> */}
      <div>
        {agent && companyProfile &&
        <AgentProfile
          companyProfile={companyProfile}
          agentProfile={agent}
          agentid={agentid}
        />
        }
      </div>
    </>
  );
}
