export default async function handler(req, res) {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method Not Allowed" });
    }
  
    // Log the incoming body to inspect what is received
    console.log("Request body:", req.body);
  
    const adfXml = req.body;
  
    if (!adfXml) {
      return res.status(400).json({ error: "Missing adfXml in request body" });
    }
  
    // Replace with your actual credentials
    const username = "i1SmartMarketingProdUser";
    const password = "F7!kzP1w@Q2sJ5r";
    const auth = Buffer.from(`${username}:${password}`).toString("base64"); // Base64 encode the credentials
  
    try {
      const response = await fetch(
        "https://webapi.car-research.com/receiver/listener/queue",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/xml", // Ensure XML content type is set
            Authorization: `Basic ${auth}`, // Add Basic Auth header
          },
          body: adfXml, // Send the raw XML data in the body
        }
      );
  
      const responseText = await response.text();
      console.log("External API response:", responseText);
  
      if (!response.ok) {
        return res.status(response.status).send(responseText);
      }
  
      res.status(200).json({ message: "Data sent successfully", response: responseText });
    } catch (error) {
      console.error("Error sending data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  