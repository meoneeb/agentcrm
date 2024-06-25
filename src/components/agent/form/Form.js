"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import StyledButton from "../button/Styled";

export default function Form({ agentProfile }) {
  const router = useRouter();
  const agentName = `${agentProfile.firstname} ${agentProfile.lastname}`;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [formError, setFormError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhone = (phone) => {
    const re = /^\d{10}$/;
    return re.test(String(phone));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setFormError("Please enter a valid email address.");
      return;
    }

    if (!validatePhone(formData.phone)) {
      setFormError("Please enter a valid phone number (10 digits).");
      return;
    }

    setFormError("");
    setIsLoading(true);
    setResponseMessage("");

    const adfXml = `
      <adf>
        <prospect>
          <source>i1Smart Marketing</source>
          <requestdate>${new Date().toISOString()}</requestdate>
          <customer>
            <contact>
              <name part="first">${formData.firstName}</name>
              <name part="last">${formData.lastName}</name>
              <email><![CDATA[${formData.email}]]></email>
              <phone><![CDATA[${formData.phone}]]></phone>
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

    try {
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
        setTimeout(() => {
          router.push(`${agentProfile.walletpass}`); // Replace with the desired link
        }, 3000);
      } else {
        setResponseMessage(`Failed to send email: ${result.message}`);
      }
    } catch (error) {
      setResponseMessage(`An error occurred: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
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

          {formError && (
            <p className="text-red-500 text-center">{formError}</p>
          )}

          <StyledButton type="submit" disabled={isLoading}>
            {isLoading ? "Sending..." : "Submit"}
          </StyledButton>
        </div>
      </form>
      {responseMessage && (
        <p className="text-center mt-4">{responseMessage}</p>
      )}
    </div>
  );
}
