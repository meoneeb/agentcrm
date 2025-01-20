import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" }); // Handle unsupported methods
  }

  try {
    // Connect to MongoDB
    const client = await clientPromise;
    const db = client.db("profile");

    // Fetch users
    const users = await db.collection("user").find({}).toArray();

    // Send response
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);

    // Differentiate between connection errors and general server errors
    if (error.name === "MongoNetworkError") {
      res.status(503).json({ message: "Database connection error. Please try again later." });
    } else {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
