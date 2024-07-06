"use client";
import { useState } from "react";
import StyledButton from "@/componentsGlobal/button/Styled";
import AddNewCompany from "@/components/company/db/AddNewCompany";

export default function CreateCompanyPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordSubmit = () => {
    // Define your password check logic here
    if (password === "1245") {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handlePasswordSubmit();
    }
  };

  return (
    <>
      <title>Add New Company</title>
      {!isAuthenticated ? (
        <div style={overlayStyle}>
          <div
            style={overlayContentStyle}
            className="flex flex-col justify-center items-center gap-4"
          >
            <h2>Enter Password</h2>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              onKeyDown={handleKeyDown}
              className={inputStyle}
            />
            <StyledButton onClick={handlePasswordSubmit} style={buttonStyle}>
              Submit
            </StyledButton>
          </div>
        </div>
      ) : (
        <AddNewCompany />
      )}
    </>
  );
}

const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.8)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const overlayContentStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "8px",
  textAlign: "center",
};

const inputStyle =
  "border px-4 flex justify-center items-start h-16 rounded-xl w-full focus:border-zinc-800 focus:border-2 focus:outline-none ";

const buttonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  cursor: "pointer",
};
