"use client";
import { useState } from "react";
import StyledButton from "../../../componentsGlobal/button/Styled";
import { companyArr } from "@/data/company";

export default function AddNewAgent() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    title: "",
    email: "",
    agentid: "",
    cellphone: "",
    company: "",
    img: "",
    smartpass: "",
    action: [
      {
        label: "",
        icon: "",
        url: "",
      },
    ],
    social: [
      {
        icon: "",
        href: "",
      },
    ],
  });

  const socialIcons = [
    "facebook",
    "linkedin",
    "tiktok",
    "instagram",
    "yelp",
    "youtube",
  ];
  const actionIcons = ["fi-rr-phone-call", "fi-rr-envelope", "fi-rr-messages"];

  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [validationMessages, setValidationMessages] = useState({});

  const handleActionChange = (index, e) => {
    const { name, value } = e.target;
    const newAction = [...formData.action];
    newAction[index][name] = value;
    setFormData({
      ...formData,
      action: newAction,
    });
  };

  const addNewAction = () => {
    setFormData({
      ...formData,
      action: [...formData.action, { label: "", icon: "", url: "" }],
    });
  };
  const removeAction = (index) => {
    const newAction = formData.action.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      action: newAction,
    });
  };

  const handleSocialChange = (index, e) => {
    const { name, value } = e.target;
    const newSocial = [...formData.social];
    newSocial[index][name] = value;
    setFormData({
      ...formData,
      social: newSocial,
    });
  };

  const addNewSocial = () => {
    setFormData({
      ...formData,
      social: [...formData.social, { icon: "", href: "" }],
    });
  };
  const removeSocial = (index) => {
    const newSocial = formData.social.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      social: newSocial,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = {};
    Object.keys(formData).forEach((key) => {
      if (Array.isArray(formData[key])) {
        formData[key].forEach((item, index) => {
          Object.keys(item).forEach((subKey) => {
            if (!item[subKey]) {
              errors[`${key}[${index}].${subKey}`] = "Field is required.";
            }
          });
        });
      } else if (!formData[key]) {
        errors[key] = "Field is required.";
      }
    });
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setValidationMessages(errors);
      return;
    }

    setFormError("");
    setIsLoading(true);
    setResponseMessage("");

    try {
      const response = await fetch("/api/agent/add-agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (response.ok) {
        setResponseMessage("Information submitted successfully!");
      } else {
        setResponseMessage(`Failed to submit: ${result.message}`);
      }
    } catch (error) {
      setResponseMessage(`An error occurred: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass =
    "border px-4 flex justify-center items-start h-12 rounded-xl w-full focus:border-zinc-800 focus:border-2 focus:outline-none ";
  const actionClass =
    "border px-4 flex justify-center items-start rounded-xl w-full focus:border-zinc-800 focus:border-2 focus:outline-none h-12";

  return (
    <div className="flex lg:flex-row flex-col justify-start items-start w-full">
      <div className="flex flex-col justify-start items-center w-full mx-auto p-6">
        <h2 className="text-2xl font-semibold text-zinc-800">
          Create New Agent
        </h2>
        <p className="text-neutral-500 mb-8">
          Enter the required information to create new agent page
        </p>
        <form onSubmit={handleSubmit} className="w-full md:max-w-lg">
          <div className="flex flex-col space-y-4 text-neutral-900">
            <div className="flex flex-col md:flex-row md:space-x-4 md:space-y-0 space-y-4">
              <div className="w-full">
                <input
                  className={inputClass}
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
                {validationMessages.firstName && (
                  <p className="text-red-500 text-sm">
                    {validationMessages.firstName}
                  </p>
                )}
              </div>
              <div className="w-full">
                <input
                  className={inputClass}
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
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
                className={inputClass}
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
              />
              {validationMessages.title && (
                <p className="text-red-500 text-sm">
                  {validationMessages.title}
                </p>
              )}
            </div>
            <div className="w-full">
              <input
                className={inputClass}
                type="text"
                name="agentid"
                placeholder="Agent ID"
                value={formData.agentid}
                onChange={handleChange}
              />
              {validationMessages.agentid && (
                <p className="text-red-500 text-sm">
                  {validationMessages.agentid}
                </p>
              )}
            </div>
            <div className="w-full">
              <select
                id="company"
                className={`w-auto flex justify-center items-center ${actionClass}`}
                name="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                required
              >
                <option value="" disabled>
                  Select Company
                </option>
                {companyArr.map((company) => (
                  <option key={company.company} value={company.company}>
                    {company.name}
                  </option>
                ))}
              </select>
              {validationMessages.company && (
                <p className="text-red-500 text-sm">
                  {validationMessages.company}
                </p>
              )}
            </div>
            <div className="w-full">
              <input
                className={inputClass}
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              {validationMessages.email && (
                <p className="text-red-500 text-sm">
                  {validationMessages.email}
                </p>
              )}
            </div>

            <div className="w-full">
              <input
                className={inputClass}
                type="tel"
                name="cellphone"
                placeholder="Phone"
                value={formData.cellphone}
                onChange={handleChange}
              />
              {validationMessages.cellphone && (
                <p className="text-red-500 text-sm">
                  {validationMessages.cellphone}
                </p>
              )}
            </div>
            <div className="w-full">
              <input
                className={inputClass}
                type="text"
                name="smartpass"
                placeholder="Smartpass Link"
                value={formData.smartpass}
                onChange={handleChange}
              />
              {validationMessages.smartpass && (
                <p className="text-red-500 text-sm">
                  {validationMessages.smartpass}
                </p>
              )}
            </div>
            <div className="w-full">
              <input
                className={inputClass}
                type="text"
                name="img"
                placeholder="Image Link"
                value={formData.img}
                onChange={handleChange}
              />
              {validationMessages.img && (
                <p className="text-red-500 text-sm">{validationMessages.img}</p>
              )}
            </div>

            <div>
              <div className="flex flex-row gap-2 my-4">
                <h3 className="text-xl font-semibold text-zinc-800">
                  Add Action Buttons
                </h3>
                <button
                  type="button"
                  className="h-8 px-4 gap-2 text-sm flex justify-center items-center border border-solid border-zinc-800 rounded-full text-white bg-zinc-800 hover:bg-zinc-900"
                  onClick={addNewAction}
                >
                  <i className="fi fi-rr-plus"></i> ADD NEW ACTION BUTTON
                </button>
              </div>

              {formData.action.map((action, index) => (
                <div
                  key={index}
                  className="flex gap-4 flex-col border border-grey-300 rounded-xl p-4 bg-neutral-100 mb-4"
                >
                  <div className="flex flex-row gap-4">
                    <select
                      id={`icon-${index}`}
                      className={`w-auto flex justify-center items-center ${actionClass}`}
                      name="icon"
                      value={action.icon}
                      onChange={(e) => handleActionChange(index, e)}
                      required
                    >
                      <option value="" disabled>
                        Select icon
                      </option>
                      {actionIcons.map((icon) => (
                        <option key={icon} value={icon}>
                          {icon}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      className={actionClass}
                      id={`label-${index}`}
                      name="label"
                      value={action.label}
                      onChange={(e) => handleActionChange(index, e)}
                      placeholder="Label"
                      required
                    />
                  </div>
                  <input
                    type="text"
                    className={actionClass}
                    id={`url-${index}`}
                    name="href"
                    value={action.url}
                    onChange={(e) => handleActionChange(index, e)}
                    placeholder="Link"
                    required
                  />
                  <button
                    type="button"
                    className="h-8 px-4 gap-2 text-sm flex justify-center items-center border border-solid border-red-400 rounded-full text-white bg-red-600 hover:bg-red-700"
                    onClick={() => removeAction(index)}
                  >
                    <i className="fi fi-rr-trash"></i> REMOVE ACTION
                  </button>
                </div>
              ))}
            </div>

            <div>
              <div className="flex flex-row gap-2 my-4">
                <h3 className="text-xl font-semibold text-zinc-800">
                  Add Social Media Platforms
                </h3>
                <button
                  type="button"
                  className="h-8 px-4 gap-2 text-sm flex justify-center items-center border border-solid border-zinc-800 rounded-full text-white bg-zinc-800 hover:bg-zinc-900"
                  onClick={addNewSocial}
                >
                  <i className="fi fi-rr-plus"></i> ADD
                </button>
              </div>

              {formData.social.map((social, index) => (
                <div
                  key={index}
                  className="flex gap-4 flex-col border border-grey-300 rounded-xl p-4 bg-neutral-100 mb-4"
                >
                  <div className="flex flex-row gap-4">
                    <select
                      id={`icon-${index}`}
                      className={`w-auto flex justify-center items-center ${actionClass}`}
                      name="icon"
                      value={social.icon}
                      onChange={(e) => handleSocialChange(index, e)}
                      required
                    >
                      <option value="" disabled>
                        Select icon
                      </option>
                      {socialIcons.map((icon) => (
                        <option key={icon} value={icon}>
                          {icon}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      className={actionClass}
                      id={`url-${index}`}
                      name="url"
                      value={social.href}
                      onChange={(e) => handleSocialChange(index, e)}
                      placeholder="Link"
                      required
                    />
                  </div>

                  <button
                    type="button"
                    className="h-8 px-4 gap-2 text-sm flex justify-center items-center border border-solid border-red-400 rounded-full text-white bg-red-600 hover:bg-red-700"
                    onClick={() => removeSocial(index)}
                  >
                    <i className="fi fi-rr-trash"></i> REMOVE
                  </button>
                </div>
              ))}
            </div>

            {formError && (
              <p className="text-red-500 text-center">{formError}</p>
            )}

            {responseMessage && (
              <p
                className={`text-center ${
                  responseMessage.includes("successfully")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {responseMessage}
              </p>
            )}

            <StyledButton type="submit" disabled={isLoading}>
              {isLoading ? "Sending..." : "Submit"}
            </StyledButton>
          </div>
        </form>
      </div>
      {/* <div className="flex max-w-sm w-full h-screen bg-zinc-200 lg:sticky lg:top-0 lg:mr-8">
        PREVIEW
      </div> */}
    </div>
  );
}
