// pages/passes.js
"use client";
import React, { useEffect, useState } from "react";

export default function AllPasses() {
  const [passes, setPasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [passTemplates, setPassTemplates] = useState([]);
  const [selectedTemplateUid, setSelectedTemplateUid] = useState("");

  useEffect(() => {
    async function fetchPassTemplates() {
      try {
        setLoading(true);
        const response = await fetch("/api/passcreator/all-templates");
        if (!response.ok) {
          throw new Error("Failed to fetch pass templates");
        }
        const data = await response.json();
        setPassTemplates(data);
      } catch (error) {
        console.error("Error fetching pass templates:", error);
      } finally {
        setLoading(false); // Set loading to false regardless of success or failure
      }
    }

    fetchPassTemplates();
  }, []);

  const handleTemplateChange = (event) => {
    setSelectedTemplateUid(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!selectedTemplateUid) {
      return;
    }

    try {
      setLoading(true);
      setError(null); // Reset error
      const response = await fetch(
        `/api/passcreator/passList?passTemplateUid=${selectedTemplateUid}`
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to fetch passes: ${response.status} - ${errorText}`
        );
      }
      const data = await response.json();
      setPasses(data.results);
    } catch (error) {
      console.error("Error fetching passes:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Passes</h1>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="templateSelect">Select Pass Template:</label>
        <select
          id="templateSelect"
          value={selectedTemplateUid}
          onChange={handleTemplateChange}
          className="border border-black p-2"
        >
          <option value="">--Select Template--</option>
          {passTemplates.map((template) => (
            <option key={template.identifier} value={template.identifier}>
              {template.name}
            </option>
          ))}
        </select>
        <button className="p-2 bg-black text-white" type="submit">Show Passes</button>
      </form>

      {loading && <p>Loading...</p>}

      {error && <p>Error: {error}</p>}

      {!loading && !error && passes.length > 0 && (
        <div>
          <p>Total Passes: {passes.length}</p>
          <ul>
            {passes.map((pass) => (
              <li key={pass.identifier}>
                <p>Identifier: {pass.identifier}</p>
                <p>Name: {pass.name}</p>
                <p>Created On: {new Date(pass.createdOn).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {!loading && !error && passes.length === 0 && (
        <p>No passes available for the selected template.</p>
      )}
    </div>
  );
}
