export default function AboutCompany({ company, user }) {
  const fulladdress = `${company.address} ${company.city} ${company.region}, ${company.zipcode}`;
  const accent = company.accent;

  const isUserPrime = company.isUserPrime;
  const dialCode = company.countrycode;
  const ext = user.ext;
  const userPhone = user.cellphone ? `${dialCode}${user.cellphone}` : "";
  const companyPhone = company.workphone
    ? `${dialCode}${company.workphone}`
    : "";

  const phoneExt =
    companyPhone ||
    (userPhone ? `${userPhone}${ext ? ` Ext:${ext}` : ""}` : "");
  const phoneExtUrl =
    companyPhone || (userPhone ? `${userPhone}${ext ? `,${ext}` : ""}` : "");

  const phone = isUserPrime ? userPhone || companyPhone : phoneExt;
  const phoneUrl = isUserPrime
    ? userPhone
      ? `tel:+${userPhone}`
      : `tel:+${companyPhone}`
    : `tel:+${phoneExtUrl}`;

  return (
    <div
      className="w-full px-4 flex flex-col justify-start items-center"
      //   style={{ border: "1px solid red " }}
    >
      <div className="p-4 w-full border border-solid border-neutral-300 rounded-xl flex flex-col gap-4">
        <div>
          <h3 className="font-bold text-sm text-center mb-2">
            About {company.name}
          </h3>
          <p className="text-neutral-500">{company.about}</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-neutral-500">
            <i className="fi fi-rr-marker text-sm mr-2"></i>
            {fulladdress}
          </p>
          <a href={phoneUrl} target="_blank" className="text-neutral-500">
            <i className="fi fi-rr-phone-call text-sm mr-2"></i>
            {phone}
          </a>

          {company.website && (
            <a
              href={`https://${company.website}`}
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
