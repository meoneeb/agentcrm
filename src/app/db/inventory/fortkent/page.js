"use client";
import { useState, useEffect } from "react";

function InventoryList() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [xmlData, setXmlData] = useState("");

  useEffect(() => {
    async function fetchInventory() {
      try {
        const response = await fetch("/api/cardog");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json(); // Assuming the data returned is JSON

        // Check if inventory is available and is an array
        if (data.inventory && Array.isArray(data.inventory.vehicleList)) {
          setInventory(data.inventory.vehicleList);
          // Convert the fetched inventory to XML format
          const xmlString = convertToXML(data.inventory.vehicleList);
          setXmlData(xmlString); // Set the XML string in the state
        } else {
          throw new Error("Vehicle list is missing or not an array");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchInventory();
  }, []);

  // Function to convert inventory data to XML
  function convertToXML(inventoryList) {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<inventory>\n';

    inventoryList.forEach((vehicle) => {
      xml += "  <vehicle>\n";
      xml += `    <inventoryID>${vehicle.inventoryID}</inventoryID>\n`;
      xml += `    <invID>${vehicle.invID}</invID>\n`;
      xml += `    <vin>${vehicle.vin}</vin>\n`;
      xml += `    <stockNumber>${vehicle.stockNumber}</stockNumber>\n`;
      xml += `    <stockNo>${vehicle.stockNo}</stockNo>\n`;
      xml += `    <vehicleType>${vehicle.vehicleType}</vehicleType>\n`;
      xml += `    <segment>${vehicle.segment}</segment>\n`;
      xml += `    <stockType>${vehicle.stockType}</stockType>\n`;
      xml += `    <year>${vehicle.year}</year>\n`;
      xml += `    <make>${vehicle.make}</make>\n`;
      xml += `    <model>${vehicle.model}</model>\n`;
      xml += `    <series>${vehicle.series}</series>\n`;
      xml += `    <style>${vehicle.style}</style>\n`;
      xml += `    <odometer>${vehicle.odometer}</odometer>\n`;
      xml += `    <exteriorColor>${vehicle.exteriorColor}</exteriorColor>\n`;
      xml += `    <transmission>${vehicle.transmission}</transmission>\n`;
      xml += `    <status>${vehicle.status}</status>\n`;
      xml += `    <isAvailable>${vehicle.isAvailable}</isAvailable>\n`;
      xml += `    <msrp>${vehicle.askingPrice}</msrp>\n`;
      xml += `    <imageUrls>${vehicle.imageUrls}</imageUrls>\n`;
      xml += `    <priorRental>${vehicle.priorRental}</priorRental>\n`;
      xml += `    <isExcludedFromExports>${vehicle.isExcludedFromExports}</isExcludedFromExports>\n`;
      xml += `    <displayName>${vehicle.displayName}</displayName>\n`;
      xml += `    <imageUrl>${vehicle.imageUrl}</imageUrl>\n`;
      xml += `    <imageCount>${vehicle.imageCount}</imageCount>\n`;
      xml += `    <daysInStock>${vehicle.daysInStock}</daysInStock>\n`;
      xml += `    <age>${vehicle.age}</age>\n`;
      xml += `    <isDealerCertified>${vehicle.isDealerCertified}</isDealerCertified>\n`;
      xml += `    <isWholesale>${vehicle.isWholesale}</isWholesale>\n`;
      xml += `    <webLeads>${vehicle.webLeads}</webLeads>\n`;
      xml += `    <quotes>${vehicle.quotes}</quotes>\n`;
      xml += `    <demos>${vehicle.demos}</demos>\n`;
      xml += `    <carfaxEnabled>${vehicle.carfaxEnabled}</carfaxEnabled>\n`;
      xml += "  </vehicle>\n";
    });

    xml += "</inventory>";

    return xml;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <pre
      style={{
        whiteSpace: "pre-wrap",
        wordWrap: "break-word",
        backgroundColor: "#f4f4f4",
        padding: "10px",
      }}
    >
      {xmlData}
    </pre>
  );
}

export default InventoryList;
