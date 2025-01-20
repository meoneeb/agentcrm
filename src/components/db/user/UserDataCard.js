export default function UserDataCard({ user, onClick }) {
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
    </div>
  );
}
