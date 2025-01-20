"use client";

import { useState, useEffect, useMemo } from "react";
import { companyArr } from "@/data/company";
import EditUserDataCard from "./EditUserDataCard";

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

export default function AllUserDataEdit() {
  const [selectedCompany, setSelectedCompany] = useState("All companies");
  const [selectedUser, setSelectedUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/mongo/get-user-data");
        const data = await response.json();

        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error("Invalid data received:", data);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const enrichedUsers = useMemo(
    () => mergeUserWithCompany(users, companyArr),
    [users, companyArr]
  );

  const handleChange = (e) => {
    setSelectedCompany(e.target.value);
    setSelectedUser(null);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    setCurrentPage(1);
  };

  const filteredUsers = enrichedUsers.filter((user) => {
    const searchLower = searchTerm.toLowerCase();
    const isCompanyMatch =
      selectedCompany === "All companies" ||
      user.company.toLowerCase() === selectedCompany.toLowerCase();

    return (
      isCompanyMatch &&
      (user.firstname.toLowerCase().includes(searchLower) ||
        user.lastname.toLowerCase().includes(searchLower) ||
        user.company.toLowerCase().includes(searchLower) ||
        user._id.toLowerCase().includes(searchLower))
    );
  });

  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="w-full mx-auto">
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div className="flex flex-col lg:flex-row w-full">
          <div className="lg:w-1/2 p-4">
            <h1 className="text-2xl font-bold mb-4">All Users Landing Pages</h1>
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="p-2 border rounded mb-4"
            />
            <select
              value={selectedCompany}
              onChange={handleChange}
              className="p-2 border rounded"
            >
              <option>All companies</option>
              {companyArr.map((company) => (
                <option key={company.company} value={company.company}>
                  {company.name}
                </option>
              ))}
            </select>

            {filteredUsers.length === 0 ? (
              <p>No users found</p>
            ) : (
              <div className="grid grid-cols-2 gap-4 mt-4">
                {paginatedUsers.map((user) => (
                  <EditUserDataCard
                    key={user._id}
                    user={user}
                    onClick={() => setSelectedUser(user)}
                  />
                ))}
              </div>
            )}

            <div className="flex justify-between mt-4">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Next
              </button>
            </div>
          </div>
          <div className="lg:w-1/2">
            {selectedUser ? (
              <iframe
                src={`/${selectedUser.company}/${selectedUser.agentid}`}
                title={`${selectedUser.firstname} Preview`}
                className="w-full h-screen"
              />
            ) : (
              <p>Select a user to preview</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
