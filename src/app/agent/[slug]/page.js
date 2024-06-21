"use client";
import { usePathname } from "next/navigation";
import AgentProfile from "@/components/agent/AgentProfile";
import { agentArr } from "@/data/agent";
import Head from "next/head";
export default function page({ params }) {
  const pathname = usePathname();
  // Function to convert spaces to hyphens
  const username = (text) => {
    return text.toLowerCase().replace(/\s+/g, "-");
  };

  const agentProfile = agentArr.find(
    (value) => params.slug === username(value.slug)
  );

  const fullname = `${agentProfile.firstname} ${agentProfile.lastname}`

  // If no matching portfolio item is found, return null
  if (!agentProfile) {
    return <Custom404 />;
  }
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/icons/fav.png" />
        <meta property="og:site_name" content={"figics.com"} key="ogsitename" />
        <meta charSet="utf-8" />
        <meta name="description" content={fullname}></meta>
        <meta
          property="og:title"
          content={`${fullname} | figics.com`}
          key="ogtitle"
        />
        {/* <meta
          property="og:url"
          content={`https://www.figics.com/${username(userProfile.slug)}`}
          key="ogurl"
        /> */}
        <meta
          property="og:description"
          content={fullname}
          key="ogdesc"
        />
        {/* <meta
          property="og:image"
          content={`https://www.figics.com${userProfile.avatar}`}
          key="ogimage"
        />
        <meta
          data-rh="true"
          name="twitter:image:src"
          content={`https://www.figics.com${userProfile.avatar}`}
        /> */}
        <meta
          data-rh="true"
          name="twitter:card"
          content="summary_large_image"
        />
        <title>{`${fullname} | figics.com`}</title>
      </Head>
      <div className="fixed top-0 w-screen h-2 bg-blue-500"></div>
      <AgentProfile agentProfile={agentProfile} />
    </>
  );
}
