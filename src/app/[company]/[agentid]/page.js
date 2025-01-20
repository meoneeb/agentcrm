"use client";

import AgentProfile from "@/components/agent/AgentProfile";
import { companyArr } from "@/data/company";
import { useState, useEffect } from "react";

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

export default function AgentPage({ params }) {
  const { company, agentid } = params;
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state

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
        setLoading(false); // Set loading to false after the fetch is complete
      }
    };

    fetchUsers();
  }, []);

  const enrichedUsers = mergeUserWithCompany(users, companyArr);

  const username = (text) => {
    if (!text) {
      return "";
    }
    return text.toLowerCase().replace(/\s+/g, "-");
  };

  const userData = enrichedUsers.find(
    (value) =>
      agentid === username(value.agentid) && company === username(value.company)
  );

  if (loading) {
    return <div>Loading...</div>; // Show loading message or spinner
  }

  if (!userData) {
    return <div>User not found</div>; // You can replace this with a custom 404 component
  }

  const fullname = `${userData.firstname} ${userData.lastname}`;
  const companyProfile = userData.companyInfo; // Updated to use companyInfo
  const favicon = companyProfile.logo || "/icons/fav.png"; // Updated to use logo field if available
  const profileImg =
    userData.img ||
    `https://placehold.co/150?text=${
      userData.firstname[0] + userData.lastname[0]
    }`;

  return (
    <>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={favicon} />
        <meta charSet="utf-8" />
        <meta name="description" content="" />
        <meta property="og:title" content={fullname} key="ogtitle" />
        <meta property="og:description" content="" key="ogdesc" />
        <meta property="og:image" content={profileImg} key="ogimage" />
        <meta name="twitter:image:src" content={profileImg} />
        <meta name="twitter:card" content="summary_large_image" />
        <title>{`${fullname} - ${companyProfile.name}`}</title>
      </head>
      <div>
        <AgentProfile companyProfile={companyProfile} agentProfile={userData} />
      </div>
    </>
  );
}
