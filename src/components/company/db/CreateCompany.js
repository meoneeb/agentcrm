"use client";
import { useState } from "react";
import StyledButton from "@/componentsGlobal/button/Styled";
export default function CreateCompany() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    website: "",
    logo: "",
    accent: "",
    address: "",
    city: "",
    region: "",
    zipcode: "",
    country: "",
    workphone: "",
    providerUri: "",
    recipientEmail: "",
    emailSubject: "",
    social: [
      {
        icon: "",
        href: "",
      },
    ],
    action: [
      {
        label: "",
        icon: "",
        url: "",
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
      social: [...formData.social, { label: "", icon: "", href: "" }],
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
      if (!formData[key]) {
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
      const response = await fetch("/api/company/add-company", {
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
    <div className="flex flex-col justify-start items-center w-full mx-auto p-6">
      <h2 className="text-2xl font-semibold text-zinc-800">
        Create New Company
      </h2>
      <p className="text-neutral-500 mb-8"></p>
      <form onSubmit={handleSubmit} className="w-full md:max-w-lg">
        <div className="flex flex-col space-y-4 text-neutral-900">
          <div className="flex flex-col md:flex-row md:space-x-4 md:space-y-0 space-y-4">
            <div className="w-full">
              <input
                className={inputClass}
                type="text"
                name="name"
                placeholder="Company Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {validationMessages.name && (
                <p className="text-red-500 text-sm">
                  {validationMessages.name}
                </p>
              )}
            </div>
            <div className="w-full">
              <input
                className={inputClass}
                type="text"
                name="company"
                placeholder="Company Slug"
                value={formData.company}
                onChange={handleChange}
                required
              />
              {validationMessages.company && (
                <p className="text-red-500 text-sm">
                  {validationMessages.company}
                </p>
              )}
            </div>
          </div>
          <div className="w-full">
            <input
              className={inputClass}
              type="text"
              name="website"
              placeholder="Website URL"
              value={formData.website}
              onChange={handleChange}
              required
            />
            {validationMessages.website && (
              <p className="text-red-500 text-sm">
                {validationMessages.website}
              </p>
            )}
          </div>
          <div className="w-full">
            <input
              className={inputClass}
              type="text"
              name="logo"
              placeholder="Logo URL"
              value={formData.logo}
              onChange={handleChange}
              required
            />
            {validationMessages.logo && (
              <p className="text-red-500 text-sm">{validationMessages.logo}</p>
            )}
          </div>
          <div className="w-full">
            <input
              className={inputClass}
              type="accent"
              name="accent"
              placeholder="Brand Color (R, G, B)"
              value={formData.accent}
              onChange={handleChange}
              required
            />
            {validationMessages.accent && (
              <p className="text-red-500 text-sm">
                {validationMessages.accent}
              </p>
            )}
          </div>
          <div className="flex flex-row gap-2 my-4">
            <h3 className="text-xl font-semibold text-zinc-800">
              Contact Details
            </h3>
          </div>
          <div className="w-full">
            <input
              className={inputClass}
              type="tel"
              name="workphone"
              placeholder="Work Phone"
              value={formData.workphone}
              onChange={handleChange}
              required
            />
            {validationMessages.workphone && (
              <p className="text-red-500 text-sm">
                {validationMessages.workphone}
              </p>
            )}
          </div>
          <div className="w-full">
            <input
              className={inputClass}
              type="address"
              name="address"
              placeholder="Street Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
            {validationMessages.address && (
              <p className="text-red-500 text-sm">
                {validationMessages.address}
              </p>
            )}
          </div>
          <div className="flex flex-col md:flex-row md:space-x-4 md:space-y-0 space-y-4">
            <div className="w-full">
              <input
                className={inputClass}
                type="city"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                required
              />
              {validationMessages.city && (
                <p className="text-red-500 text-sm">
                  {validationMessages.city}
                </p>
              )}
            </div>
            <div className="w-full">
              <input
                className={inputClass}
                type="region"
                name="region"
                placeholder="Region"
                value={formData.region}
                onChange={handleChange}
                required
              />
              {validationMessages.region && (
                <p className="text-red-500 text-sm">
                  {validationMessages.region}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-4 md:space-y-0 space-y-4">
            <div className="w-full">
              <input
                className={inputClass}
                type="zipcode"
                name="zipcode"
                placeholder="Zipcode"
                value={formData.zipcode}
                onChange={handleChange}
                required
              />
              {validationMessages.zipcode && (
                <p className="text-red-500 text-sm">
                  {validationMessages.zipcode}
                </p>
              )}
            </div>
            <div className="w-full">
              <input
                className={inputClass}
                type="country"
                name="country"
                placeholder="Country"
                value={formData.country}
                onChange={handleChange}
                required
              />
              {validationMessages.country && (
                <p className="text-red-500 text-sm">
                  {validationMessages.country}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-row gap-2 my-4">
            <h3 className="text-xl font-semibold text-zinc-800">
              ADF XML Fields
            </h3>
          </div>
          <div className="w-full">
            <input
              className={inputClass}
              type="providerUri"
              name="providerUri"
              placeholder="Provider Link"
              value={formData.providerUri}
              onChange={handleChange}
              required
            />
            {validationMessages.providerUri && (
              <p className="text-red-500 text-sm">
                {validationMessages.providerUri}
              </p>
            )}
          </div>
          <div className="flex flex-col md:flex-row md:space-x-4 md:space-y-0 space-y-4">
            <div className="w-full">
              <input
                className={inputClass}
                type="recipientEmail"
                name="recipientEmail"
                placeholder="CRM Email"
                value={formData.recipientEmail}
                onChange={handleChange}
                required
              />
              {validationMessages.recipientEmail && (
                <p className="text-red-500 text-sm">
                  {validationMessages.recipientEmail}
                </p>
              )}
            </div>
            <div className="w-full">
              <input
                className={inputClass}
                type="emailSubject"
                name="emailSubject"
                placeholder="Email Subject"
                value={formData.emailSubject}
                onChange={handleChange}
                required
              />
              {validationMessages.emailSubject && (
                <p className="text-red-500 text-sm">
                  {validationMessages.emailSubject}
                </p>
              )}
            </div>
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
                  name="url"
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

          {formError && <p className="text-red-500 text-center">{formError}</p>}

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
  );
}
