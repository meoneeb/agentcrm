"use client";
import { useState } from "react";
import { agentArr } from "@/data/agent";
import { companyArr } from "@/data/company";

// Helper function to merge agent and company data
const mergeAgentWithCompany = (agents, companies) => {
  return agents.map((agent) => {
    const companyInfo = companies.find(
      (company) => company.company.toLowerCase() === agent.company.toLowerCase()
    );
    return {
      ...agent,
      companyInfo: companyInfo || { name: "Unknown", logo: "" }, // Handle missing company data
    };
  });
};

export default function Page() {
  const [selectedCompany, setSelectedCompany] = useState("All companies");
  const [selectedAgent, setSelectedAgent] = useState(null);

  // Enrich agents with company information
  const enrichedAgents = mergeAgentWithCompany(agentArr, companyArr);

  const handleChange = (e) => {
    setSelectedCompany(e.target.value);
    setSelectedAgent(null); // Reset selected agent when company changes
  };

  const handleAgentClick = (agent) => {
    setSelectedAgent(agent);
  };

  const handleCopyLink = (link) => {
    navigator.clipboard.writeText(link).then(
      () => {
        alert("Link copied to clipboard!");
      },
      (err) => {
        console.error("Failed to copy link: ", err);
      }
    );
  };

  const filteredAgents =
    selectedCompany === "All companies"
      ? enrichedAgents
      : enrichedAgents.filter(
          (agent) => agent.company === selectedCompany.toLowerCase()
        );

  const mobileFrame = {
    width: 360,
    height: 720,
    border: "16px solid black",
    borderWidth: "40px 10px 40px 10px",
    borderRadius: 36,
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
    overflow: "hidden",
  };

  return (
    <div className="w-full">
      <title>List - All Agents Landing Pages DB</title>

      <div className="flex lg:flex-row flex-col w-full">
        <div className="flex flex-col flex-wrap gap-8 mt-4 lg:w-1/2 w-full p-4">
          <h1 className="text-center text-black text-2xl font-bold mt-4 mb-6">
            All Agents Landing Pages DB
          </h1>
          <div className="w-full flex flex-row gap-4 items-center justify-center">
            Filter by company:
            <select
              value={selectedCompany}
              onChange={handleChange}
              className="p-4 border border-black/20 rounded w-full max-w-60"
            >
              <option>All companies</option>
              {companyArr.map((company) => (
                <option key={company.company} value={company.company}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>
          <div className="w-full flex flex-col justify-start items-center gap-4">
            {filteredAgents.map((agent, index) => (
              <div
                key={index}
                onClick={() => handleAgentClick(agent)}
                className="p-4 border border-black/20 w-full max-w-lg bg-white text-black rounded hover:bg-black/5 hover:border-black cursor-pointer hover:scale-105 transition-all"
              >
                <h3 className="text-xl">
                  {agent.firstname} {agent.lastname}
                </h3>
                <p>
                  {agent.title}, {agent.companyInfo.name}
                </p>
                {agent.companyInfo.crm && <p className="py-1 px-2 border border-solid border-black w-fit font-bold text-sm">{agent.companyInfo.crm}</p>}

                {agent.companyInfo.logo && (
                  <img
                    src={agent.companyInfo.logo}
                    alt={`${agent.companyInfo.name} logo`}
                    className="w-16 h-16 object-cover mt-2"
                  />
                )}
                <div
                  className="p-2 flex flex-row flex-wrap items-center justify-between rounded border border-black/20 mt-2 bg-black/5 hover:bg-black/10"
                  onClick={() =>
                    handleCopyLink(
                      `https://flarepass.com/${agent.company}/${agent.agentid}`
                    )
                  }
                >
                  <p className="text-sm">
                    https://flarepass.com/{agent.company}/{agent.agentid}
                  </p>
                  <span className="text-xs uppercase font-bold text-black/50">
                    Click to Copy Link
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:w-1/2 w-full">
          {selectedAgent ? (
            <div
              id="preview"
              className="w-full h-screen sticky top-0 flex justify-center items-center"
            >
              <div style={mobileFrame} className="lg:mt-0 mt-24">
                <iframe
                  src={`/${selectedAgent.company}/${selectedAgent.agentid}`}
                  title="Agent Preview"
                  className="w-full h-full"
                />
              </div>
            </div>
          ) : (
            <div className="text-center w-full h-screen flex justify-center items-center sticky top-0">
              Select an agent to preview
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
