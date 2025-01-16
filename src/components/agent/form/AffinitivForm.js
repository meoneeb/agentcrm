"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import StyledButton from "../../../componentsGlobal/button/Styled";

export default function AffinitivForm({ agentProfile, companyProfile }) {
  const router = useRouter();
  const agentName = `${agentProfile.firstname} ${agentProfile.lastname}`;
  const agentEmail = agentProfile.email;
  const providerUri = companyProfile.providerUri;
  const dealerId = companyProfile.dealerId;
  console.log(dealerId);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    latitude: "",
    longitude: "",
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

  // Fetch geolocation on page load
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prevFormData) => ({
            ...prevFormData,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }));
        },
        (error) => {
          console.error("Error fetching geolocation:", error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

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
          <vendor>
                <id>${dealerId}</id>
                <contact>
                    <name part="full">${agentName}</name>
                    <email><![CDATA[${agentEmail}]]></email>
                </contact>
            </vendor>
          <provider>
            <name part="full">i1Smart Marketing</name>
            <service>i1Smart Marketing</service>
            <url><![CDATA[${providerUri}]]></url>
            <email><![CDATA[${agentEmail}]]></email>
          </provider>
          <geolocation>
            <latitude>${formData.latitude}</latitude>
            <longitude>${formData.longitude}</longitude>
          </geolocation>
        </prospect>
      </adf>
    `;

    try {
      const response = await fetch("/api/affinitiv/send-lead", {
        method: "POST",
        headers: {
          "Content-Type": "application/xml",
        },
        body: adfXml, // Send the XML string directly
      });
      console.log("ADF", adfXml); // Log the XML string to the console

      if (response.ok) {
        setResponseMessage("Information submitted successfully!");
        setTimeout(() => {
          router.push(`${agentProfile.smartpass}`);
        }, 3000);
      } else {
        const result = await response.json();
        setResponseMessage(`Failed to submit: ${result.error}`);
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
          <div>
            <p className="text-xs text-gray-600">
              Keep your location enabled for best results.
            </p>
            {/* {formData.latitude}, {formData.longitude} */}
          </div>
        </div>
      </form>
      {responseMessage && <p className="text-center mt-4">{responseMessage}</p>}
    </div>
  );
}
