"use client";
import React, { useEffect, useState } from "react";

export default function AllTemplates() {
  const [passTemplates, setPassTemplates] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading state

  useEffect(() => {
    async function fetchPassTemplates() {
      try {
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

  // Function to calculate total number of templates
  const getTotalTemplates = () => {
    return passTemplates.length;
  };

  if (loading) {
    return <p>Loading...</p>; // Render loading state while data is being fetched
  }

  return (
    <div className="p-4">
      <h1 className="text-4xl mb-4">Pass Templates</h1>
      <p>Total Templates: {getTotalTemplates()}</p>
      <ul>
        {passTemplates.map((template) => (
          <li
            key={template.identifier}
            className="p-4 mb-2 border border-neutral-300 text-black bg-white hover:text-white hover:bg-black"
          >
            <p>{template.name}</p>
            <p>Identifier: {template.identifier}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
