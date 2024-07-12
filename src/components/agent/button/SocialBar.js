export default function SocialBar({ agentProfile, companyProfile }) {
  const agentSocial = agentProfile.social || [];
  const companySocial = companyProfile.social || [];

  return (
    <>
      {!(agentSocial.length === 0 && companySocial.length === 0) ? (
        <div className="flex flex-col gap-2 p-4 absolute right-0 top-32 bg-white shadow-xl rounded-s-xl">
          {agentSocial.map((handle, index) => (
            <a
              key={`agent-${index}`}
              href={handle.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex justify-center items-center cursor-pointer"
            >
              <img src={handle.icon} alt={handle.label} />
            </a>
          ))}
          {companySocial.map((handle, index) => (
            <a
              key={`company-${index}`}
              href={handle.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex justify-center items-center cursor-pointer h-6 w-6"
            >
              <img src={`/icons/social/${handle.icon}.svg`} alt={handle.icon} />
            </a>
          ))}
        </div>
      ) : null}
    </>
  );
}
