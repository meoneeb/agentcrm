export default function AboutCompany({ companyProfile, agentProfile }) {
  const fulladdress = `${companyProfile.address} ${companyProfile.city} ${companyProfile.region}, ${companyProfile.zipcode}`;
  const accent = companyProfile.accent;
  const displayPhone = companyProfile.workphone || `${agentProfile.cellphone}${agentProfile.ext ? ` Ext:${agentProfile.ext}` : ""}`;
  const callPhone = companyProfile.workphone || `${agentProfile.cellphone}${agentProfile.ext ? `,${agentProfile.ext}` : ""}`;

  return (
    <div
      className="w-full px-4 flex flex-col justify-start items-center"
      //   style={{ border: "1px solid red " }}
    >
      <div className="p-4 w-full border border-solid border-neutral-300 rounded-xl flex flex-col gap-4">
        <div>
          <h3 className="font-bold text-sm text-center mb-2">
            About {companyProfile.name}
          </h3>
          <p className="text-neutral-500">{companyProfile.about}</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-neutral-500">
            <i className="fi fi-rr-marker text-sm mr-2"></i>
            {fulladdress}
          </p>
          <a
            href={`tel:+1${callPhone}`}
            target="_blank"
            className="text-neutral-500"
          >
            <i className="fi fi-rr-phone-call text-sm mr-2"></i>
            {displayPhone}
          </a>
          {companyProfile.website && (
            <a
              href={`https://${companyProfile.website}`}
              target="_blank"
              className="text-neutral-500"
            >
              <i className="fi fi-rr-up-right-from-square text-sm mr-2"></i>
              Vist our website
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
