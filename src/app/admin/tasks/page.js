"use client";
import { useState } from "react";
import StyledButton from "@/componentsGlobal/button/Styled";

export function ClickupTasks() {
  return (
    <div>
      <iframe
        class="clickup-embed"
        src="https://sharing.clickup.com/9018321303/l/h/6-901802484972-1/eb28eb60b79787f"
        onwheel=""
        width="100%"
        height="700px"
        // style={{background: transparent; border: 1px solid #ccc;"
      ></iframe>
    </div>
  );
}

export default function page() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordSubmit = () => {
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
      <title>Tasks List</title>
      {!isAuthenticated ? (
        <div style={overlayStyle}>
          <div
            style={overlayContentStyle}
            className="flex flex-col justify-center items-center gap-4"
          >
            <h2>Enter PIN</h2>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              onKeyDown={handleKeyDown}
              className={inputStyle}
            />
            <StyledButton onClick={handlePasswordSubmit} style={buttonStyle}>
              Verify
            </StyledButton>
          </div>
        </div>
      ) : (
        <ClickupTasks />
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
