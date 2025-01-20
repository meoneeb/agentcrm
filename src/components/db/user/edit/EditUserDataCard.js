import { useState } from "react";

export default function EditUserDataCard({ user, onClick }) {
  const [img, setImg] = useState(user.img || ""); // Set initial img URL from the user data
  const [loading, setLoading] = useState(false);

  const handleCopyLink = (link) => {
    navigator.clipboard.writeText(link).then(
      () => {
        alert("Link copied to clipboard!");
      },
      (err) => {
        console.error("Failed to copy link: ", err);
      }
    );
  };

  const handleCopyId = (id) => {
    navigator.clipboard.writeText(id).then(
      () => {
        alert("User ID copied to clipboard!");
      },
      (err) => {
        console.error("Failed to copy user ID: ", err);
      }
    );
  };

  const handleImgChange = (e) => {
    setImg(e.target.value); // Update img state when input changes
  };

  const handleUpdateImage = async () => {
    if (!img) {
      alert("Please enter a valid image URL.");
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await fetch(`/api/mongo/update-user-img`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user._id,
          img: img,
        }),
      });
  
      // Check if the response status is ok (200-299)
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }
  
      // Try to parse the response as JSON
      const data = await response.json();
  
      if (data.message === "Image updated successfully") {
        alert("Image updated successfully");
      } else {
        alert("Failed to update image");
      }
    } catch (err) {
      console.error("Error updating image:", err);
      alert("Error updating image");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div
      onClick={onClick}
      className="p-4 border border-black/20 w-full max-w-lg bg-white text-black rounded hover:bg-black/5 hover:border-black cursor-pointer hover:scale-105 transition-all"
    >
      <h3 className="text-xl">
        {user.firstname} {user.lastname}
      </h3>
      <p>
        {user.title}, {user.companyInfo.name}
      </p>
      <p
        onClick={() => handleCopyId(`${user._id}`)}
        className="text-sm text-gray-600"
      >
        {user._id}
      </p>

      <div
        className="p-2 flex flex-row flex-wrap items-center justify-between rounded border border-black/20 mt-2 bg-black/5 hover:bg-black/10"
        onClick={() =>
          handleCopyLink(
            `https://flarepass.com/${user.company}/${user.agentid}`
          )
        }
      >
        <p className="text-sm">
          https://flarepass.com/{user.company}/{user.agentid}
        </p>
        <span className="text-xs uppercase font-bold text-black/50">
          Click to Copy Link
        </span>
      </div>

      {/* Displaying the current image URL */}
      {/* <div className="mt-4">
        <p className="text-sm text-gray-600">Current Image URL:</p>
        <p className="text-sm text-blue-600">{img}</p>
      </div> */}

      {/* Input to change image URL */}
      <div className="mt-4">
        <input
          type="text"
          value={img}
          onChange={handleImgChange}
          className="w-full p-2 border border-black/20 rounded"
          placeholder="Enter new image URL"
        />
      </div>

      {/* Button to trigger image update */}
      <button
        onClick={handleUpdateImage}
        className={`mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all ${
          loading && "opacity-50 cursor-not-allowed"
        }`}
        disabled={loading}
      >
        {loading ? "Updating..." : "Update Image"}
      </button>
    </div>
  );
}
