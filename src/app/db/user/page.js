'use client'
import { useState, useEffect } from "react";
import Link from "next/link";

export default function dbUserPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");

  const correctUserId = "admin";
  const correctPassword = "123!";

  const buttonStyle = `border border-black h-12 my-2 w-fit min-w-24 px-12 flex justify-center items-center hover:translate-x-2 hover:border-l-8 transition-all`;

  // Check if the user is authenticated on page load
  useEffect(() => {
    const storedAuth = sessionStorage.getItem("isAuthenticated");
    if (storedAuth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (userId, password) => {
    if (userId === correctUserId && password === correctPassword) {
      setIsAuthenticated(true);
      setError("");
      sessionStorage.setItem("isAuthenticated", "true"); // Store in session
    } else {
      setError("Invalid User ID or Password");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("isAuthenticated"); // Remove from session
  };

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="w-full max-w-7xl px-6 py-12 mx-auto">
        <h1 className="text-4xl mb-6">Manage Users</h1>
        <div className="grid grid-cols-1">
          {!isAuthenticated ? (
            <div className="flex flex-col items-center">
              <h2 className="text-xl mb-4">Please Log In</h2>
              <div>
                {/* Your login form can go here */}
                <input
                  type="text"
                  placeholder="User ID"
                  className="border p-2 mb-2"
                  id="loginUserId"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="border p-2 mb-4"
                  id="loginPassword"
                />
                <button
                  onClick={() =>
                    handleLogin(
                      document.getElementById("loginUserId").value,
                      document.getElementById("loginPassword").value
                    )
                  }
                  className={buttonStyle}
                >
                  Log In
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <Link className={buttonStyle} href={`/db/user/all`}>
                All Users
              </Link>

              {/* <Link className={buttonStyle} href={`/db/user/all`}>
                Add New User
              </Link> */}

              <Link className={buttonStyle} href={`/db/user/all/edit`}>
                Update All Users Image
              </Link>

              <button
                onClick={handleLogout}
                className={`border border-red-500 h-12 my-2 w-fit min-w-24 px-12 flex justify-center items-center hover:translate-x-2 hover:border-l-8 transition-all text-red-500`}
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
