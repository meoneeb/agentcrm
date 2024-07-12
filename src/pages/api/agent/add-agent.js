import client from "@/lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await client.connect();
      const db = client.db("agentcrm");
      const collection = db.collection("agents");
      const agent = await collection.insertOne(req.body);
      res.status(200).json({ message: "Agent added successfully", agent });
    } catch (error) {
      res.status(500).json({ message: "Failed to connect to the database", error: error.message });
    } finally {
      await client.close();
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
