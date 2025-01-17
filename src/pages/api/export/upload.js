import * as XLSX from "xlsx";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      // Parse the uploaded file
      const fileBuffer = req.body; // File should be sent as a binary buffer
      const workbook = XLSX.read(fileBuffer, { type: "buffer" });

      // Log workbook metadata for debugging
      console.log("Workbook Sheets:", workbook.SheetNames);

      // Check if the first sheet has data
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      if (!sheet) {
        console.error("No sheet found in the workbook.");
        return res
          .status(400)
          .json({ success: false, message: "No sheet found in the file." });
      }

      // Convert the sheet to JSON
      const sheetData = XLSX.utils.sheet_to_json(sheet);
      console.log("Raw sheet data:", sheetData);

      if (sheetData.length === 0) {
        console.error("Sheet data is empty.");
        return res
          .status(400)
          .json({ success: false, message: "Sheet contains no data." });
      }

      // Transform the data
      const jsonData = sheetData.map((row) => ({
        firstname: row["First Name"] || "",
        lastname: row["Last Name"] || "",
        agentid: `${(row["First Name"] || "").toLowerCase()}-${(
          row["Last Name"] || ""
        ).toLowerCase()}`,
        crmEmployerID: row["CRM Employee ID"] || null,
        title: row["Job Title"] || "",
        email: row["Email"] || "",
        cellphone: row["Cell Phone"] || "",
        company: (row["Company"] || "").toLowerCase().replace(/\s+/g, ""),
        img: null,
        smartpass: row["Digtal Card Download Page"] || "",
      }));

      // Log transformed data for debugging
      console.log("Transformed Data:", jsonData);

      // Return response
      res.status(200).json({ success: true, data: jsonData });
    } catch (error) {
      console.error("Error processing file:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}
