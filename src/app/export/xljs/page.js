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
    <div className="w-full max-w-7xl mx-auto min-h-screen px-8 py-12">
      <h1 className="text-4xl mb-8">Upload CSV File</h1>

      <div className="w-full flex lg:flex-row flex-col items-center justify-start space-x-4 mb-4">
        <label htmlFor="companyName">Enter Company Name:</label>
        <input
          id="companyName"
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Enter Company Name"
          className="border px-4 flex justify-center items-start h-16 rounded-xl w-full focus:border-zinc-800 focus:border-2 focus:outline-none border-gray-300  max-w-80"
        />
      </div>

      <div
        {...getRootProps()}
        style={dropzoneStyle}
        className="hover:bg-blue-400/10"
      >
        <input {...getInputProps()} />
        <p>Drag & drop a CSV file here, or click to select one</p>
      </div>

      {error && <div style={{ color: "red" }}>{error}</div>}

      {jsonData && (
        <div>
          <div className="flex flex-row gap-2 justify-start items-center mt-4 mb-2">
            <h3 className="font-semibold">Mapped JSON</h3>
            <button
              className="text-sm font-medium py-2 px-4 rounded-xl border border-blue-500 bg-white text-blue-500"
              onClick={copyToClipboard}
            >
              <i class="fi fi-rr-clone mr-1"></i> Copy
            </button>
          </div>
          <div className="bg-gray-800 text-white border border-gray-200 min-h-40 max-h-screen p-4 overflow-auto relative">
            <div className="absolute top-4 right-4">
              <button
                className="sticky top-4 text-sm font-medium py-2 px-4 rounded-xl border border-gray-400 bg-gray-300/10 text-gray-400 hover:text-gray-200"
                onClick={copyToClipboard}
              >
                <i class="fi fi-rr-clone mr-1"></i> Copy
              </button>
            </div>
            <pre>{JSON.stringify(jsonData, null, 2)}</pre>
          </div>
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
