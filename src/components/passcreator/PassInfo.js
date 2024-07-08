"use client";
import React, { useState } from "react";

export default function PassInfo() {
  const [passUid, setPassUid] = useState("");
  const [passData, setPassData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const handleInputChange = (event) => {
    setPassUid(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!passUid) {
      setError("Please enter a pass UID.");
      return;
    }

    try {
      setLoading(true);
      setError(null); // Reset error
      setPassData(null); // Reset previous pass data

      const response = await fetch(`/api/passcreator/pass?passUid=${passUid}`);
      const responseText = await response.text();

      if (!response.ok) {
        throw new Error(
          `Failed to fetch pass: ${response.status} - ${responseText}`
        );
      }

      const data = JSON.parse(responseText);
      setPassData(data);
    } catch (error) {
      console.error("Error fetching pass:", error.message);
      setError("Error fetching pass: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderPassFieldData = (passFieldData) => {
    return Object.entries(passFieldData).map(([key, value]) => (
      <li key={key}>
        <strong>{key}:</strong> {value}
      </li>
    ));
  };

  return (
    <div className="p-4">
      <h1>Pass Information</h1>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="passUid">Enter Pass UID:</label>
        <input
          type="text"
          id="passUid"
          value={passUid}
          onChange={handleInputChange}
          className="p-2 bg-white text-black border border-black"
        />
        <button type="submit">Fetch Pass Info</button>
      </form>

      {loading && <p>Loading...</p>}

      {error && <p>Error: {error}</p>}

      {passData && (
        <div>
          <h2>Pass Details</h2>
          <div className="flex my-2 p-4 border border-black rounded bg-zinc-100">
            <ul>
              {passData.identifier && (
                <li>
                  <strong>Identifier:</strong> {passData.identifier}
                </li>
              )}
              {passData.generatedId && (
                <li>
                  <strong>Generated ID:</strong> {passData.generatedId}
                </li>
              )}
              {passData.createdOn && (
                <li>
                  <strong>Created On:</strong>{" "}
                  {new Date(passData.createdOn).toLocaleString()}
                </li>
              )}
              {passData.modifiedOn && (
                <li>
                  <strong>Modified On:</strong>{" "}
                  {new Date(passData.modifiedOn).toLocaleString()}
                </li>
              )}
              {passData.passTemplateName && (
                <li>
                  <strong>Template Name:</strong> {passData.passTemplateName}
                </li>
              )}
              {passData.linkToPassPage && (
                <li>
                  <strong>Pass Page:</strong>{" "}
                  <a
                    href={passData.linkToPassPage}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {passData.linkToPassPage}
                  </a>
                </li>
              )}
              {passData.qrCodeImage && (
                <li>
                  <strong>QR Code:</strong>{" "}
                  <img
                    src={passData.qrCodeImage}
                    alt="QR Code"
                    style={{ maxWidth: "200px" }}
                  />
                </li>
              )}
              {passData.barcodeValue && (
                <li>
                  <strong>Barcode Value:</strong> {passData.barcodeValue}
                </li>
              )}
              <li>
                {passData.passFieldData.Year}
              </li>
              {passData.passFieldData && (
                <li>
                  <strong>Pass Field Data:</strong>
                  <ul>{renderPassFieldData(passData.passFieldData)}</ul>
                </li>
                
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
