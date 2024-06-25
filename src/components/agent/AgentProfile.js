"use client";
import SideModal from "./SideModal";
import ButtonAction from "./button/Action";
import StyledButton from "./button/Styled";
import Form from "./form/Form";
import { useState } from "react";

export default function AgentProfile({ agentProfile, companyProfile }) {
  const fullname = `${agentProfile.firstname} ${agentProfile.lastname}`;
  const img = agentProfile.img;
  const title = agentProfile.title;
  const company = companyProfile.name;
  const accent = companyProfile.accent;


  const handleClick = () => {
    alert("button clicked");
  };
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  return (
    <div className="flex flex-row justify-center items-start">
      <div className="container flex lg:flex-row flex-col justify-center items-start">
        <div className="w-full h-screen md:h-fit lg:w-1/3 flex flex-col lg:justify-start justify-center items-center pt-12">
          <div className="flex flex-col gap-4 justify-start items-center pb-6">
            <img
              src={img}
              alt={fullname}
              className="w-40 h-40 rounded-full p-1 border-solid shadow-lg"
              style={{ border: `4px solid rgba(${accent}, 1)` }}
            />
            <div className="flex flex-col gap-2 justify-center items-center">
              <h1 className="text-2xl font-semibold text-neutral-900">
                {fullname}
              </h1>
              <h3 className="text-lg text-neutral-500">{title}</h3>
              <img
                className="w-72 text-neutral-500"
                src={companyProfile.logo}
                alt={company}
              />
            </div>
            {/* <div className="flex flex-row gap-2">
              {agentProfile.social.map((handle, index) => (
                <div
                  key={index}
                  className="group flex justify-center items-center w-12 h-12 rounded-xl border border-solid border-neutral-300 bg-white hover:-translate-y-1 cursor-pointer"
                >
                  <i className={`${handle.icon} text-xl text-neutral-400 `}></i>
                </div>
              ))}
            </div> */}
          </div>
          <div className="flex flex-col gap-4">
            <StyledButton
              onClick={handleOpenModal}
              companyProfile={companyProfile}
            >
              <p>Share my info</p>
              <i className="fi fi-rr-redo"></i>
            </StyledButton>
            <StyledButton
              sec
              onClick={handleClick}
              companyProfile={companyProfile}
            >
              <p>Download Contact</p>
              <i className="fi fi-rr-download"></i>
            </StyledButton>

            <SideModal isOpen={isModalOpen} onClose={handleCloseModal}>
              <Form agentProfile={agentProfile} />
            </SideModal>
          </div>
        </div>
        <div className="w-full lg:w-2/3 md:pt-12 px-4 lg:pr-24 mb-12">
          <ButtonAction
            agentProfile={agentProfile}
            companyProfile={companyProfile}
          />
        </div>
      </div>
    </div>
  );
}
