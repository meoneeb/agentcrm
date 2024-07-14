"use client";
import { agentArr, updatedAgentArr } from "@/data/agent";
import { companyArr } from "@/data/company";
import { useState } from "react";

export default function Page() {
  const [selectedCompany, setSelectedCompany] = useState("All companies");
  const [selectedAgent, setSelectedAgent] = useState(null);

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
      ? agentArr
      : agentArr.filter(
          (agent) => agent.company === selectedCompany.toLowerCase()
        );

  return (
    <div className="w-full">
      <title>List - All Agents Landing Pages DB</title>

      <div className="flex flex-row w-full">
        <div className="flex flex-col flex-wrap gap-8 mt-4 w-1/2">
          <h1 className="text-center text-black text-2xl font-bold mt-4 mb-6">
            All Agents Landing Pages DB
          </h1>
          <div className="w-full flex flex-row gap-4 items-center justify-end">
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
          {filteredAgents.map((agent, index) => (
            <div
              key={index}
              onClick={() => handleAgentClick(agent)}
              className="p-4 border border-black/20 w-full bg-white text-black rounded-xl shadow-xl hover:shadow-black/20 hover:border-black cursor-pointer"
            >
              <h3 className="text-xl">
                {agent.firstname} {agent.lastname}
              </h3>
              <p>
                {agent.title}, {agent.company}
              </p>
              <div className="p-2 flex flex-row items-center justify-between border border-black/20 mt-2 bg-black/20">
                <p>
                  https://flarepass.com/{agent.company}/{agent.agentid}
                </p>
                <button
                  onClick={() =>
                    handleCopyLink(
                      `https://flarepass.com/${agent.company}/${agent.agentid}`
                    )
                  }
                  className="fi fi-rr-copy text-sm p-2 border border-black/30 text-white bg-black rounded"
                >
                  Copy Link
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="w-1/2 px-4">
          {selectedAgent ? (
            <div
              id="preview"
              className="w-full h-screen sticky top-0 overflow-hidden"
            >
              <iframe
                src={`https://flarepass.com/${selectedAgent.company}/${selectedAgent.agentid}`}
                title="Agent Preview"
                className="w-full h-full border-0"
                style={{ overflow: "hidden" }}
              />
            </div>
          ) : (
            <div className="text-center">Select an agent to preview</div>
          )}
        </div>
      </div>
    </div>
  );
}
