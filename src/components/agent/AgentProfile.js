"use client";
import PoweredBy from "../home/PoweredBy";
import ScreenModal from "@/componentsGlobal/modal/ScreenModal";
import ActionBar from "./button/ActionBar";
import SocialBar from "./button/SocialBar";
import StyledButton from "../../componentsGlobal/button/Styled";
import Form from "./form/Form";
import { useState } from "react";
import AboutCompany from "./details/Company";
import VCardDownload from "./button/VCardDownload";

export default function AgentProfile({ agentProfile, companyProfile }) {
  const fullname = `${agentProfile.firstname} ${agentProfile.lastname}`;
  const img =
    agentProfile.img || companyProfile.defaultProfileImg || `/avatar.webp`;
  const title = agentProfile.title;
  const company = companyProfile.name;
  const accent = companyProfile.accent;

  const handleClick = () => {
    window.open(agentProfile.smartpass, "_blank");
  };

  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  return (
    <div className="flex flex-col justify-start items-center bg-zinc-300 min-h-screen overflow-hidden">
      <div className="container flex flex-col justify-start items-center w-full h-full min-h-screen pb-24 max-w-sm bg-white relative">
        <div
          className="absolute top-0 w-full max-w-sm h-2"
          style={{ background: `rgba(${companyProfile.accent}, 1)` }}
        ></div>
        <div className="w-full min-h-screen h-fit flex flex-col justify-start items-center pt-12">
          <div className="flex flex-col gap-4 justify-start items-center pb-6">
            <img
              className="w-60 max-h-16 object-contain text-neutral-500"
              src={companyProfile.logo}
              alt={company}
            />
            <img
              src={img}
              alt={fullname}
              className="w-36 h-36 rounded-full p-1 border-solid object-cover shadow-lg"
              style={{ border: `3px solid rgba(${accent}, 1)` }}
            />
            <div className="flex flex-col gap-0 justify-center items-center">
              <h1 className="text-2xl font-semibold text-neutral-900">
                {fullname}
              </h1>
              <h3 className="text-lg text-neutral-500">{title}</h3>
            </div>
            <div className="flex flex-col justify-center items-center gap-2">
              <VCardDownload
                agentProfile={agentProfile}
                companyProfile={companyProfile}
              />
              <StyledButton onClick={handleClick} className={`w-full`}>
                Add to Wallet App
              </StyledButton>
              <StyledButton
                onClick={handleOpenModal}
                className={`w-full`}
                outlined
              >
                Share your Information
              </StyledButton>
              <div>
                <ScreenModal isOpen={isModalOpen} onClose={handleCloseModal}>
                  <Form
                    agentProfile={agentProfile}
                    companyProfile={companyProfile}
                  />
                </ScreenModal>
              </div>
            </div>
            <SocialBar
              agentProfile={agentProfile}
              companyProfile={companyProfile}
            />
          </div>
          <AboutCompany companyProfile={companyProfile} />
          <PoweredBy />
        </div>
        {/* ACTIONBAR START */}
        <div className="fixed bottom-0 w-full max-w-sm">
          <ActionBar
            agentProfile={agentProfile}
            companyProfile={companyProfile}
          />
        </div>
        {/* ACTIONBAR END */}
      </div>
    </div>
  );
}
