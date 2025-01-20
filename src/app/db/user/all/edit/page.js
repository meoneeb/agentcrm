"use client";
import { useState, useEffect } from "react";
import AllUserDataEdit from "@/components/db/user/edit/AllUserData";
import LoginForm from "@/components/db/form/LoginForm";

export default function AllAgentDataPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [userRole, setUserRole] = useState(null);

  // Check session on page load
  useEffect(() => {
    const storedUserRole = localStorage.getItem("userRole");
    const storedAuthStatus = localStorage.getItem("isAuthenticated");

    if (storedAuthStatus === "true" && storedUserRole) {
      setIsAuthenticated(true);
      setUserRole(storedUserRole);
    }
  }, []);

  const handleLogin = (userId, password) => {
    // Check credentials based on the login form inputs and env variables
    if (
      (userId === process.env.NEXT_PUBLIC_ADMIN_USER_ID &&
        password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) ||
      (userId === process.env.NEXT_PUBLIC_USER2_USER_ID &&
        password === process.env.NEXT_PUBLIC_USER2_PASSWORD)
    ) {
      setIsAuthenticated(true);
      setUserRole(userId);
      setError("");

      // Store session data in localStorage
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userRole", userId);
    } else {
      setError("Invalid User ID or Password");
    }
  };

  const handleLogout = () => {
    // Clear session data and redirect to login
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userRole");

    setIsAuthenticated(false);
    setUserRole(null);
  };

  return (
    <>
      <title>Edit Image - All Users</title>
      {!isAuthenticated ? (
        <LoginForm onLogin={handleLogin} errorMessage={error} />
      ) : (
        <div className="w-full bg-white px-8">
          <div className="flex flex-row justify-start items-center w-full mt-6 gap-4">
            <h3 className="text-center text-xl font-bold">
              Welcome, {userRole}
            </h3>
            <div className="text-center">
              <button
                onClick={handleLogout}
                className="px-4 py-1 bg-white text-red-600 hover:text-white rounded hover:bg-red-600"
              >
                Logout
              </button>
            </div>
          </div>

          {userRole === process.env.NEXT_PUBLIC_ADMIN_USER_ID ? (
            <AllUserDataEdit /> // Admin can see AllUserDataEdit
          ) : (
            <div>Welcome User 2, you have limited access!</div> // User 2 content
          )}
        </div>
      )}
    </>
  );
}
