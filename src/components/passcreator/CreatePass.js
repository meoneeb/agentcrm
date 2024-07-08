"use client";
import { useState } from "react";

export default function CreatePassForm() {
  const [passTemplateUid, setPassTemplateUid] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    let additional_properties = {
      "firstName": firstName,
      "last name": lastName,
      "Year": year,
      "64e3b3ca9e5648.94044252": make,
      "64e3b3ca9e5675.67666073": model,
    };
    const passData = {
      "64e3b2319d9136.54009888":firstName,
      additionalProperties: [
        {  id:'64e3b2319d9136.54009888', value: firstName },
        { 'last name': lastName },
        {id:'Year', value: year}
      ]
    };
    // additional_properties = Object.entries(additional_properties)
    // .map(([id, value]) => ({ id, value }));
    try {
      const response = await fetch(
        `/api/passcreator/create-pass?passtemplate=${passTemplateUid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(passData),
        }
       
      );  
      // console.log(additionalProperties)

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          `Failed to create pass: ${response.status} - ${data.message}`
        );
      }

      alert("Pass created successfully!");
    } catch (error) {
      console.error("Error creating pass:", error.message);
      alert("Failed to create pass. Please check console for details.");
    }
  };

  const style = "border border-black p-2 text-black bg-white";

  return (
    <div className="flex flex-col p-4">
      <h1>Create New Pass</h1>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label htmlFor="passTemplateUid">Pass Template UID:</label>
        <input
          className={style}
          type="text"
          id="passTemplateUid"
          value={passTemplateUid}
          onChange={(e) => setPassTemplateUid(e.target.value)}
          required
        />
        <label htmlFor="firstName">First Name:</label>
        <input
          className={style}
          type="text"
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <label htmlFor="lastName">Last Name:</label>
        <input
          className={style}
          type="text"
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <label htmlFor="year">Year:</label>
        <input
          className={style}
          type="text"
          id="year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
        <label htmlFor="make">Make:</label>
        <input
          className={style}
          type="text"
          id="make"
          value={make}
          onChange={(e) => setMake(e.target.value)}
          required
        />
        <label htmlFor="model">Model:</label>
        <input
          className={style}
          type="text"
          id="model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          required
        />
        <button type="submit">Create Pass</button>
      </form>
    </div>
  );
}
