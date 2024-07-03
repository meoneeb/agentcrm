import client from "@/lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await client.connect();
      const db = client.db("agentcrm");
      const collection = db.collection("agents");

      // Retrieve all documents from the collection
      const allAgents = await collection.find().toArray();

      res.status(200).json({ message: "Database connected successfully", allAgents });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    } finally {
      await client.close(); // Ensure the database connection is closed
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
