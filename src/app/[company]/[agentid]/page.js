"use client";

import AgentProfile from "@/components/agent/AgentProfile";
import { updatedAgentArr } from "@/data/agent"; // Ensure this path is correct
import { companyArr } from "@/data/company";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AgentPage({ params }) {
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

  const username = (text) => {
    return text ? text.toLowerCase().replace(/\s+/g, "-") : "";
  };

  const agentProfile = updatedAgentArr.find(
    (value) =>
      agentid === username(value.agentid) && company === username(value.company)
  );

  const mergeCompanyData = (companyArr) => {
    const companyDetails = companyArr.find((c) => c.company === agent?.company);
    return companyDetails && agent ? { ...agent, companyDetails } : agent;
  };

  const updatedAgent = mergeCompanyData(companyArr);
  const fullname = `${updatedAgent?.firstname} ${updatedAgent?.lastname}`;
  const companyProfile = updatedAgent?.companyDetails;

  if (!agentProfile) {
    return <div>Agent not found</div>; // Custom 404 message or component
  }

  return (
    <div>
      {agent && companyProfile && (
        <AgentProfile
          companyProfile={companyProfile}
          agentProfile={agent}
          agentid={agentid}
        />
      )}
      {error && <div>Error: {error}</div>}
    </div>
  );
}
