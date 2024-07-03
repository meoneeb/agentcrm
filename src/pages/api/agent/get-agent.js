import client from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await client.connect();
      const db = client.db("agentcrm");
      const collection = db.collection("agents");

      // Get agent_id from query parameters
      const { agentid } = req.query;

      // Find agent by agent_id
      if (agentid) {
        const agent = await collection.findOne({agentid: agentid });
        if (!agent) {
          return res.status(404).json({ message: "Agent not found" });
        }
        return res.status(200).json({ message: "Agent found", agent });
      } else {
        return res.status(400).json({ message: "agent_id is required" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    } finally {
      await client.close(); // Ensure the database connection is closed
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
