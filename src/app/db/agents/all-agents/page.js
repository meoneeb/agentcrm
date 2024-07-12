import { agentArr } from "@/data/agent";

export default function Page() {
  return (
    <div className="p-2">
      <title>List - All Agents</title>
      <h1 className="text-center text-black text-2xl font-bold mt-4 mb-6">
        All Agents - Dempsey
      </h1>
      <div className="flex flex-row flex-wrap gap-4 grid md:grid-cols-4 grid-cols-1 mt-4">
        {agentArr.map((agent, index) => (
          agent.company === "dempsey" && (
            <a
              key={index}
              href={`/${agent.company}/${agent.agentid}`}
              className="p-4 border border-zinc-300 w-full bg-white text-black hover:text-white hover:bg-black"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3 className="text-xl">
                {agent.firstname} {agent.lastname}
              </h3>
              <p>
                {agent.title}, {agent.company}
              </p>
            </a>
          )
        ))}
      </div>
    </div>
  );
}
