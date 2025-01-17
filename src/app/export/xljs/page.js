// components/CsvUploadForm.js
"use client";
import React, { useState } from "react";
import Papa from "papaparse";
import { useDropzone } from "react-dropzone";

const CsvUploadForm = () => {
  const [jsonData, setJsonData] = useState(null);
  const [error, setError] = useState(null);
  const [companyName, setCompanyName] = useState("");

  const fieldMappings = {
    "First Name": "firstname",
    "Last Name": "lastname",
    "Job Title": "title",
    "Cell Phone": "cellphone",
    Email: "email",
    id: "crmEmployeeId",
    smartpass: "smartpass",
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];

    if (file && file.type === "text/csv") {
      parseCsv(file);
    } else {
      setError("Please upload a valid CSV file");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: ".csv",
  });

  const parseCsv = (file) => {
    const reader = new FileReader();

    reader.onload = () => {
      const csvString = reader.result;

      Papa.parse(csvString, {
        header: true,
        dynamicTyping: true,
        complete: (result) => {
          const mappedData = result.data.map((row) => {
            const mappedRow = {};

            Object.keys(row).forEach((field) => {
              if (fieldMappings[field]) {
                mappedRow[fieldMappings[field]] = row[field];
              }
            });

            const firstname = mappedRow.firstname
              ? mappedRow.firstname.toLowerCase().replace(/\s+/g, "-")
              : "";
            const lastname = mappedRow.lastname
              ? mappedRow.lastname.toLowerCase().replace(/\s+/g, "-")
              : "";
            mappedRow.agentid = `${firstname}-${lastname}`;

            mappedRow.company = companyName || "Default Company Name";

            return mappedRow;
          });

          setJsonData(mappedData);
          setError(null);
        },
        error: (err) => {
          setError("Error parsing CSV");
          setJsonData(null);
        },
      });
    };

    reader.readAsText(file);
  };

  const copyToClipboard = () => {
    const jsonString = JSON.stringify(jsonData, null, 2);
    navigator.clipboard.writeText(jsonString).then(
      () => {
        alert("JSON copied to clipboard!");
      },
      (err) => {
        alert("Failed to copy JSON: " + err);
      }
    );
  };

  return (
    <div className="min-h-screen p-8">
      <h2>Upload CSV File</h2>

      <div>
        <label htmlFor="companyName">Enter Company Name:</label>
        <input
          id="companyName"
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Enter Company Name"
        />
      </div>

      <div {...getRootProps()} style={dropzoneStyle}>
        <input {...getInputProps()} />
        <p>Drag & drop a CSV file here, or click to select one</p>
      </div>

      {error && <div style={{ color: "red" }}>{error}</div>}

      {jsonData && (
        <div>
          <h3>Mapped JSON</h3>
          <button onClick={copyToClipboard}>Copy JSON</button>
          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
          <button onClick={copyToClipboard}>Copy JSON</button>
        </div>
      )}
    </div>
  );
};

const dropzoneStyle = {
  border: "2px dashed #0070f3",
  padding: "20px",
  textAlign: "center",
  borderRadius: "5px",
  cursor: "pointer",
};

export default CsvUploadForm;
