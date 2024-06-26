export default function SocialBar({ agentProfile }) {
  return (
    <div className="flex flex-col gap-2 p-4 absolute right-0 top-32 bg-white shadow-xl rounded-s-xl">
      {agentProfile.social.map((handle, index) => (
        <a
          key={index}
          href={handle.href}
          target="_blank"
          className="group flex justify-center items-center cursor-pointer"
        >
          <img src={handle.icon} alt={handle.label} />
        </a>
      ))}
    </div>
  );
}
