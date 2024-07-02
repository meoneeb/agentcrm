import client from "@/lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    // const { toEmail, subject, message } = req.body;
    await client.connect();
    // Get the database and collection
    const db = client.db("agentcrm");
    const collection = db.collection("company");
    // Retrieve all documents from the collection
    const agent = await collection.insertOne(req.body);
    res.status(200).json({ message: "database connected successfully", agent });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}