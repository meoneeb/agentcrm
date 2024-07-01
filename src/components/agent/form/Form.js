"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import StyledButton from "../button/Styled";

export default function Form({ agentProfile, companyProfile }) {
  const router = useRouter();
  const agentName = `${agentProfile.firstname} ${agentProfile.lastname}`;
  const agentEmail = agentProfile.email;
  const agentPhone = agentProfile.cellphone;
  const providerUri = companyProfile.providerUri;
  const recipientEmail = companyProfile.recipientEmail;
  const emailSubject = companyProfile.emailSubject;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [formError, setFormError] = useState("");
  const [validationMessages, setValidationMessages] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    let validationMessage = "";
    switch (name) {
      case "firstName":
        validationMessage = validateName(value)
          ? ""
          : "Only alphabets and '-' are allowed.";
        break;
      case "lastName":
        validationMessage = validateName(value)
          ? ""
          : "Only alphabets and '-' are allowed.";
        break;
      case "email":
        validationMessage = validateEmail(value)
          ? ""
          : "Please enter a valid email address.";
        break;
      case "phone":
        validationMessage = validatePhone(value)
          ? ""
          : "Please enter a valid phone number (10 digits).";
        break;
      default:
        break;
    }

    setValidationMessages((prevMessages) => ({
      ...prevMessages,
      [name]: validationMessage,
    }));
  };

  const validateName = (name) => {
    const re = /^[a-zA-Z- ]+$/;
    return re.test(name);
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

    if (!validateName(formData.firstName)) {
      setFormError("First name is invalid.");
      return;
    }

    if (!validateName(formData.lastName)) {
      setFormError("Last name is invalid.");
      return;
    }

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
          <id>${agentProfile.crmEmployerID}</id>
            <name part="full">i1Smart Marketing</name>
            <service>i1Smart Marketing</service>
            <url><![CDATA[${providerUri}]]></url>
            <email><![CDATA[leads@i1smartmarketing.com]]></email>
            <contact>
              <name part="full" type="individual">${agentName}</name>
              <email><![CDATA[${agentEmail}]]></email>
              <phone><![CDATA[${agentPhone}]]></phone>
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
          toEmail: recipientEmail,
          adfXml: adfXml,
          subject: emailSubject,
          message: adfXml,
        }),
      });
console.log(emailSubject)
      const result = await response.json();

      if (response.ok) {
        setResponseMessage("Information submitted successfully!");
        setTimeout(() => {
          router.push(`${agentProfile.smartpass}`);
        }, 3000);
      } else {
        setResponseMessage(`Failed to submit: ${result.message}`);
      }
    } catch (error) {
      setResponseMessage(`An error occurred: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = (name) => {
    let baseClass =
      "border px-4 flex justify-center items-start h-16 rounded-xl w-full focus:border-zinc-800 focus:border-2 focus:outline-none ";
    if (formData[name] === "") {
      return baseClass + "border-gray-300";
    }
    return (
      baseClass +
      (validationMessages[name] ? "border-red-500" : "border-green-500")
    );
  };

  return (
    <div className="flex flex-col justify-start items-center w-full mx-auto p-6">
      <h2 className="text-2xl font-semibold text-zinc-800">
        Share your contact information
      </h2>
      <p className="text-neutral-500 mb-8">
        Would you like to share your contact information with {agentName}?
      </p>
      <form onSubmit={handleSubmit} className="w-full md:max-w-lg">
        <div className="flex flex-col space-y-4 text-neutral-900">
          <div className="flex flex-col md:flex-row md:space-x-4 md:space-y-0 space-y-4">
            <div className="w-full">
              <input
                className={inputClass("firstName")}
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              {validationMessages.firstName && (
                <p className="text-red-500 text-sm">
                  {validationMessages.firstName}
                </p>
              )}
            </div>
            <div className="w-full">
              <input
                className={inputClass("lastName")}
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
              {validationMessages.lastName && (
                <p className="text-red-500 text-sm">
                  {validationMessages.lastName}
                </p>
              )}
            </div>
          </div>

          <div className="w-full">
            <input
              className={inputClass("email")}
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {validationMessages.email && (
              <p className="text-red-500 text-sm">{validationMessages.email}</p>
            )}
          </div>

          <div className="w-full">
            <input
              className={inputClass("phone")}
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            {validationMessages.phone && (
              <p className="text-red-500 text-sm">{validationMessages.phone}</p>
            )}
          </div>

          {formError && <p className="text-red-500 text-center">{formError}</p>}

          <StyledButton type="submit" disabled={isLoading}>
            {isLoading ? "Sending..." : "Submit"}
          </StyledButton>
        </div>
      </form>
      {responseMessage && <p className="text-center mt-4">{responseMessage}</p>}
    </div>
  );
}
