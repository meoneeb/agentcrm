"use client";
import React, { useState } from "react";
import StyledButton from "../button/Styled";

export default function Form({ agentProfile }) {
  const agentName = `${agentProfile.firstname} ${agentProfile.lastname}`;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const generateADFXML = (data) => {
    return `
      <adf>
        <prospect>
          <source>i1Smart Marketing</source>
          <requestdate>${new Date().toISOString()}</requestdate>
          <customer>
            <contact>
              <name part="first">${data.firstName}</name>
              <name part="last">${data.lastName}</name>
              <email><![CDATA[${data.email}]]></email>
              <phone><![CDATA[${data.phone}]]></phone>
            </contact>
          </customer>
          <provider>
            <name part="full">i1Smart Marketing</name>
            <service>i1Smart Marketing</service>
            <url><![CDATA[dempseydodge.i1smartmarketing.com]]></url>
            <email><![CDATA[leads@i1smartmarketing.com]]></email>
            <contact>
              <name part="full" type="individual">${agentName}</name>
            </contact>
          </provider>
        </prospect>
      </adf>
    `;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    setResponseMessage("");

    const adfXml = generateADFXML(formData);

    const response = await fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        toEmail: "hello@realty-va.com", // Recipient email
        adfXml: adfXml,
        subject: `Lead from ${agentName}`,
        message: adfXml,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      setResponseMessage("Email sent successfully");
    } else {
      setResponseMessage(`Failed to send email: ${result.message}`);
    }
    setIsLoading(false);
  };

  return (
    <div className=" w-full mx-auto p-6">
      <h2 className="text-2xl font-semibold text-blue-500">
        Share your contact information
      </h2>
      <p className="text-neutral-500 mb-8">
        Would you like to share your contact information with {agentName}?
      </p>
      <form onSubmit={handleSubmit} className="max-w-lg">
        <div className="flex flex-col space-y-4 text-neutral-900">
          <div className="flex flex-col md:flex-row md:space-x-4 md:space-y-0 space-y-4">
            <input
              className="border border-gray-300 p-4 rounded w-full focus:border-blue-500 focus:border-2 focus:outline-none"
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              className="border border-gray-300 p-4 rounded w-full focus:border-blue-500 focus:border-2 focus:outline-none"
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <input
            className="border border-gray-300 p-4 rounded w-full focus:border-blue-500 focus:border-2 focus:outline-none"
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            className="border border-gray-300 p-4 rounded w-full focus:border-blue-500 focus:border-2 focus:outline-none"
            type="tel"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          {/* <div className="border border-gray-300 p-4 rounded w-full focus:border-blue-500 focus:border-2 focus:outline-none">
            <input
              type="text"
              name="agentName"
              placeholder="Agent Name"
              value={agentName}
              disabled
            />
          </div> */}

          <StyledButton type="submit" disabled={isLoading}>
            {isLoading ? "Sending..." : "Submit"}
          </StyledButton>
        </div>
      </form>
      {responseMessage && <p className="text-center mt-4">{responseMessage}</p>}
    </div>
  );
}
