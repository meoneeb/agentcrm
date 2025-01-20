"use client";
import { useState, useEffect } from "react";
import { companyArr } from "@/data/company";
import UserDataCard from "./UserDataCard";

const mergeUserWithCompany = (users, companies) => {
  return users.map((user) => {
    const companyInfo = companies.find(
      (company) => company.company.toLowerCase() === user.company.toLowerCase()
    );
    return {
      ...user,
      companyInfo: companyInfo || { name: "Unknown", logo: "" },
    };
  });
};

export default function AllUserDataPreview() {
  const [selectedCompany, setSelectedCompany] = useState("All companies");
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/mongo/get-user-data");
        const data = await response.json();

        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error("Invalid data received from API:", data);
          setUsers([]); // Fallback to an empty array
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setUsers([]); // Fallback to an empty array
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const enrichedUsers = mergeUserWithCompany(users, companyArr);

  const handleChange = (e) => {
    setSelectedCompany(e.target.value);
    setSelectedUser(null);
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const filteredUsers =
    selectedCompany === "All companies"
      ? enrichedUsers
      : enrichedUsers.filter(
          (user) => user.company.toLowerCase() === selectedCompany.toLowerCase()
        );

  const mobileFrame = {
    width: 360,
    height: 720,
    border: "16px solid black",
    borderWidth: "40px 10px 40px 10px",
    borderRadius: 36,
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
    overflow: "hidden",
  };

  const profilesQty = filteredUsers.length;

  return (
    <div className="w-full">
      <div className="flex lg:flex-row flex-col w-full">
        {loading ? (
          <p>Loading users...</p>
        ) : (
          <div className="flex flex-col flex-wrap gap-8 mt-4 lg:w-1/2 w-full p-4">
            <h1 className="text-center text-black text-2xl font-bold mt-4 mb-6">
              All Users Landing Pages DB
            </h1>
            <div className="w-full flex flex-row gap-4 items-center justify-center">
              Filter by company:
              <select
                value={selectedCompany}
                onChange={handleChange}
                className="p-4 border border-black/20 rounded w-full max-w-60"
              >
                <option>All companies</option>
                {companyArr.map((company) => (
                  <option key={company.company} value={company.company}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full flex flex-col justify-start items-center gap-4">
              <p>Available Profile: {profilesQty}</p>
              {filteredUsers.map((user) => (
                <UserDataCard
                  key={user._id}
                  user={user}
                  onClick={handleUserClick}
                />
              ))}
            </div>
          </div>
        )}
        <div className="lg:w-1/2 w-full">
          {selectedUser ? (
            <div
              id="preview"
              className="w-full h-screen sticky top-0 flex justify-center items-center"
            >
              <div style={mobileFrame} className="lg:mt-0 mt-24">
                <iframe
                  src={`/${selectedUser.company}/${selectedUser.agentid}`}
                  title="User Preview"
                  className="w-full h-full"
                />
              </div>
            </div>
          ) : (
            <div className="text-center w-full h-screen flex justify-center items-center sticky top-0">
              Select a user to preview
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
