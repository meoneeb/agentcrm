"use client";
import { useState } from "react";
import { agentArr } from "@/data/agent";
import { companyArr } from "@/data/company";

const mergeAgentWithCompany = (agents, companies) => {
  return agents.map((agent) => {
    const companyInfo = companies.find(
      (company) => company.company.toLowerCase() === agent.company.toLowerCase()
    );
    return {
      ...agent,
      companyInfo: companyInfo || { name: "Unknown", logo: "" },
    };
  });
};

export default function Page() {
  const [selectedCompany, setSelectedCompany] = useState("All companies");
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; // Adjust as needed

  const enrichedAgents = mergeAgentWithCompany(agentArr, companyArr);

  const handleChange = (e) => {
    setSelectedCompany(e.target.value);
    setSelectedAgent(null);
    setCurrentPage(1); // Reset page on filter change
  };

  const handleAgentClick = (agent) => {
    setSelectedAgent(agent);
  };

  const handleCopyLink = (link) => {
    navigator.clipboard.writeText(link).then(() => {
      alert("Link copied to clipboard!");
    });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
    setCurrentPage(1); // Reset to first page when searching
  };

  const filteredAgents =
    selectedCompany === "All companies"
      ? enrichedAgents
      : enrichedAgents.filter(
          (agent) =>
            agent.company && agent.company === selectedCompany.toLowerCase()
        );

  const searchedAgents = filteredAgents.filter(
    (agent) =>
      (agent.firstname &&
        agent.firstname.toLowerCase().includes(searchQuery)) ||
      (agent.lastname && agent.lastname.toLowerCase().includes(searchQuery)) ||
      (agent.company && agent.company.toLowerCase().includes(searchQuery)) ||
      (agent.companyInfo.crmEmployeeId &&
        agent.companyInfo.crmEmployeeId.toLowerCase().includes(searchQuery))
  );

  // Pagination Logic
  const totalPages = Math.ceil(searchedAgents.length / itemsPerPage);
  const paginatedAgents = searchedAgents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
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
    <div className="w-full bg-white">
      <title>List - All Agents Landing Pages DB</title>

      <div className="flex lg:flex-row flex-col w-full">
        <div className="flex flex-col flex-wrap gap-8 lg:w-2/3 w-full py-4 px-6 justify-start items-start">
          <h1 className="text-center text-black text-2xl font-bold mt-4 mb-6">
            All Agents Landing Pages DB
          </h1>

          <div className="w-full flex flex-wrap items-start justify-center gap-4">
            <select
              value={selectedCompany}
              onChange={handleChange}
              className="p-4 border border-black/20 rounded w-full md:w-1/3 bg-zinc-50"
            >
              <option>All companies</option>
              {companyArr.map((company) => (
                <option key={company.company} value={company.company}>
                  {company.name}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Search by name, company, or CRM ID"
              value={searchQuery}
              onChange={handleSearch}
              className="p-4 border border-black/20 rounded w-full md:w-2/3 bg-zinc-50"
            />
          </div>
          <div className="w-full flex flex-col justify-start items-start gap-4">
            <p>Available Profiles: {searchedAgents.length}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {paginatedAgents.map((agent, index) => (
                <div
                  key={index}
                  onClick={() => handleAgentClick(agent)}
                  className="p-4 border border-black/20 w-full bg-white text-black rounded hover:bg-black/5 hover:border-black cursor-pointer hover:scale-105 transition-all"
                >
                  <h3 className="text-xl">
                    {agent.firstname} {agent.lastname}
                  </h3>
                  <p>
                    {agent.title}, {agent.companyInfo.name}
                  </p>
                  {agent.companyInfo.crm && (
                    <p className="py-1 px-2 border border-solid border-black w-fit font-bold text-sm">
                      {agent.companyInfo.crm}
                    </p>
                  )}

                  {agent.img && (
                    <img
                      src={agent.img}
                      alt={`${agent.companyInfo.name} logo`}
                      className="w-16 h-16 object-cover mt-2 rounded-full"
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
            {/* Pagination Controls */}
            <div className="flex items-center justify-center gap-4 my-4">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* Right Preview Section */}
        <div className="lg:w-1/3 w-full bg-zinc-500 md:flex hidden">
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
