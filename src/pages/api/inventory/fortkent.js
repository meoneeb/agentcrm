import { NextResponse } from "next/server";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Content-Type", "application/xml");
    return res
      .status(405)
      .send(`<error><message>Method Not Allowed</message></error>`);
  }

  const baseUrl = "https://api.cardog.com";
  const appKey = "5U4AQ6ZBS2KHKJHI1ZTLSO04K6IT9CDT";
  const apiKey = "5SMB0WTFKLTRUKT5DXY7PP09P8UERJ9U";
  const rooftopID = "475";

  try {
    // Step 1: Login to get Token
    const loginResponse = await fetch(`${baseUrl}/api/Login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: new URLSearchParams({
        appKey,
        apiKey,
      }),
    });

    if (!loginResponse.ok) {
      return res
        .status(401)
        .send(`<error><message>Authentication failed</message></error>`);
    }

    const loginData = await loginResponse.json();
    const token = loginData.token;

    if (!token) {
      return res
        .status(401)
        .send(`<error><message>Token not received</message></error>`);
    }

    // Step 2: Fetch Inventory
    const inventoryResponse = await fetch(
      `${baseUrl}/api/Inventory?includeAllImageUrls=true`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
          RooftopID: rooftopID,
        },
      }
    );

    if (!inventoryResponse.ok) {
      return res
        .status(400)
        .send(`<error><message>Error fetching inventory</message></error>`);
    }

    const inventoryData = await inventoryResponse.json();
    const xmlData = convertToXML(inventoryData);

    res.setHeader("Content-Type", "application/xml");
    res.status(200).send(xmlData);
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).send(`<error><message>Server error</message></error>`);
  }
}

// Function to convert inventory data to XML format
function convertToXML(data) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<inventory>\n';

  if (data.vehicleList && Array.isArray(data.vehicleList)) {
    data.vehicleList.forEach((vehicle) => {
      xml += "  <vehicle>\n";
      [
        "inventoryID",
        "invID",
        "vin",
        "stockNumber",
        "stockNo",
        "vehicleType",
        "segment",
        "stockType",
        "year",
        "make",
        "model",
        "series",
        "style",
        "odometer",
        "exteriorColor",
        "transmission",
        "status",
        "isAvailable",
        "askingPrice",
        "imageUrls",
        "priorRental",
        "isExcludedFromExports",
        "displayName",
        "imageUrl",
        "imageCount",
        "daysInStock",
        "age",
        "isDealerCertified",
        "isWholesale",
        "webLeads",
        "quotes",
        "demos",
        "carfaxEnabled",
      ].forEach((key) => {
        xml += `    <${key}>${vehicle[key] || ""}</${key}>\n`;
      });

      xml += "  </vehicle>\n";
    });
  }

  xml += "</inventory>";
  return xml;
}
