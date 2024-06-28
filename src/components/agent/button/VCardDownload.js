import React from "react";
import StyledButton from "./Styled";

export default function VCardDownload({ agentProfile, companyProfile }) {
  const fname = agentProfile.firstname;
  const lname = agentProfile.lastname;
  const email = agentProfile.email;
  const cellphone = agentProfile.cellphone;
  const workphone = companyProfile.workphone;
  const address = companyProfile.address;
  const city = companyProfile.city;
  const region = companyProfile.region;
  const zipcode = companyProfile.zipcode;
  const title = agentProfile.title;
  const company = companyProfile.name;
  const website = companyProfile.website;

  const vcardContent = `BEGIN:VCARD
VERSION:3.0
FN;CHARSET=UTF-8:${fname} ${lname}
N;CHARSET=UTF-8:${lname};${fname};;;
EMAIL;CHARSET=UTF-8;type=WORK,INTERNET:${email}
TEL;TYPE=HOME,VOICE:${cellphone}
TEL;TYPE=WORK,VOICE:${workphone}
ADR;CHARSET=UTF-8;TYPE=WORK:;;${address};${city};${region};${zipcode};
TITLE;CHARSET=UTF-8:${title}
ORG;CHARSET=UTF-8:${company}
URL;type=WORK;CHARSET=UTF-8:${website}
REV:2024-06-28T20:20:54.620Z
END:VCARD`;
  console.log(vcardContent, "vCard");
  const handleDownload = () => {
    const blob = new Blob([vcardContent], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${fname}-${lname}.vcf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <StyledButton onClick={handleDownload}>Save my Business Card </StyledButton>
  );
}
