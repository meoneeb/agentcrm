import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { id, img } = req.body;

    if (!id || !img) {
      return res.status(400).json({ message: "ID and image URL are required" });
    }

    try {
      const client = await clientPromise;
      const db = client.db("profile");
      const collection = db.collection("user");

      const result = await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: { img: img } }
      );
      console.log("result:", result);

      if (result.modifiedCount > 0) {
        res.status(200).json({ message: "Image updated successfully" });
      } else {
        res.status(400).json({ message: "No changes were made" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error" });
      console.log("error:", error);
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
