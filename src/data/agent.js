import { companyArr } from "./company";
export const agentArr = [
  {
    firstname: "Kelli",
    lastname: "Cordes",
    agentid: "kelli-cordes",
    title: "Marketing",
    email: "kelli@edgeperformancesports.com",
    company: "edge",
    buttontext: "Get Dollar Gift Card",
    img: "/fallbackImg.jpg",
    vcard: "/api/download-vcard",
    smartpass:
      "https://smartpass.i1smartmarketing.com/en/p/_z0eif68y-1ns6675e4e8c115d",
    social: [
      {
        label: "Linkedin",
        icon: "/icons/social/linkedin.svg",
        href: "/icons/social/linkedin.svg",
      },
      {
        label: "Instagtam",
        icon: "/icons/social/instagram.svg",
        href: "/icons/social/instagram.svg",
      },
      {
        label: "Facebook",
        icon: "/icons/social/facebook.svg",
        href: "/icons/social/facebook.svg",
      },
    ],
    action: [
      {
        label: "Call",
        icon: "fi-rr-phone-call",
        url: "tel:+15412120563",
      },
      {
        label: "Text",
        icon: "fi-rr-messages",
        url: "https://wa.me/15412120563",
      },
      {
        label: "Email",
        icon: "fi-rr-envelope",
        url: "mailto:kelli@edgeperformancesports.com",
      },
      {
        label: "Save",
        icon: "fi-rr-download",
        url: "",
      },
    ],
  },
  {
    firstname: "Oneeb",
    lastname: "Faisal",
    agentid: "oneeb-faisal",
    title: "Full Stack Designer",
    email: "meoneeb@figics.com",
    company: "figics",
    buttontext: "Get Dollar Gift Card",
    img: "https://www.figics.com/connect/meoneeb/oneeb.webp",
    csv: "",
    walletpass:
      "https://smartpass.i1smartmarketing.com/en/p/_z0eif68y-1ns6675e4e8c115d",
    social: [
      {
        icon: "fi-brands-linkedin",
        href: "#",
      },
      {
        icon: "fi-brands-instagram",
        href: "#",
      },
      {
        icon: "fi-brands-facebook",
        href: "#",
      },
    ],
    action: [
      {
        label: "Call me",
        label2: "92 324 6807263",
        icon: "fi-rr-phone-call",
        url: "tel:+923246807263",
      },
      {
        label: "Text me",
        label2: "92 324 6807263",
        icon: "fi-rr-messages",
        url: "https://wa.me/923246807263",
      },
      {
        label: "Email me",
        label2: "meoneeb@figics.com",
        icon: "fi-rr-envelope",
        url: "mailto:meoneeb@figics.com",
      },
    ],
  },
];

function mergeCompanyData(agentArr, companyArr) {
  return agentArr.map((agent) => {
    const company = companyArr.find((c) => c.company === agent.company);
    if (company) {
      return {
        ...agent,
        companyDetails: company,
      };
    }
    return agent;
  });
}

export const updatedAgentArr = mergeCompanyData(agentArr, companyArr);

console.log(updatedAgentArr);
