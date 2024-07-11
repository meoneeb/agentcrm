import client from "@/lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const { agentid } = req.query; // Assuming agentid is part of query parameters

      await client.connect();
      const db = client.db("agentcrm");
      const collection = db.collection("agents");

      // Assuming agentid is stored in a field named `_id` in MongoDB
      const agent = await collection.findOne({ agentid });

      if (agent) {
        res.status(200).json({ message: "Agent found", agent });
      } else {
        res.status(404).json({ message: "Agent not found" });
      }
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Failed to connect to the database",
          error: error.message,
        });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
