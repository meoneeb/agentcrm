"use client";
import { useState, useEffect } from "react";
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    setCurrentPage(1); // Reset to first page when search changes
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

  const profilesQty = filteredUsers.length;

  const totalPages = Math.ceil(profilesQty / usersPerPage);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const mobileFrame = {
    width: 360,
    height: 720,
    border: "16px solid black",
    borderWidth: "40px 10px 40px 10px",
    borderRadius: 36,
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
    overflow: "hidden",
  };

  return (
    <div className="w-full mx-auto">
      <div className="flex lg:flex-row flex-col w-full">
        {loading ? (
          <p>Loading users...</p>
        ) : (
          <div className="flex flex-col gap-8 mt-4 lg:w-1/2 w-full p-4">
            <div className="flex flex-col justify-start items-start">
              <h1 className="text-center text-black text-2xl font-bold mt-4 mb-6">
                All Users Landing Pages DB
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 space-x-4">
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="Search by name, company, or ID"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="p-4 border border-black/20 rounded w-full"
                  />
                </div>
                <div className="w-full flex flex-row gap-4 items-center justify-start">
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
              </div>

              <div className="w-full flex flex-col justify-start items-start gap-4 mt-6">
                <p>Available Profiles: {profilesQty}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {paginatedUsers.map((user) => (
                    <EditUserDataCard
                      key={user._id}
                      user={user}
                      onClick={() => handleUserClick(user)}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="w-full flex justify-between mt-4">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="px-4 py-2 bg-gray-500 text-white rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}

        <div className="lg:w-1/2 w-full hidden md:block">
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
