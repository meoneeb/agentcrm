"use client";
import SideModal from "./SideModal";
import ButtonAction from "./button/Action";
import StyledButton from "./button/Styled";
import Form from "./form/Form";
import { useState } from "react";

export default function AgentProfile({ agentProfile }) {
  const fullname = `${agentProfile.firstname} ${agentProfile.lastname}`;
  const img = agentProfile.img;
  const title = agentProfile.title;
  const company = agentProfile.company;
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
        <div className="w-full h-screen md:h-fit lg:w-1/3 flex flex-col justify-start items-center pt-12">
          <div className="flex flex-col gap-4 justify-start items-center pb-6">
            <img
              src={img}
              alt={fullname}
              className="w-40 rounded-full p-1 border-4 border-solid border-blue-500 shadow-blue-500/30 shadow-lg"
            />
            <div className="flex flex-col gap-0 justify-center items-center">
              <h1 className="text-2xl font-semibold text-neutral-900">
                {fullname}
              </h1>
              <h3 className="text-lg font-semibold text-neutral-500">
                {company}
              </h3>
              <h3 className="text-lg text-neutral-500">{title}</h3>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <StyledButton onClick={handleClick}>
              <p>Download Contact</p>
              <i className="fi fi-rr-download"></i>
            </StyledButton>
            <StyledButton sec onClick={handleOpenModal}>
              <p>Share my info</p>
              <i className="fi fi-rr-redo"></i>
            </StyledButton>
            <SideModal isOpen={isModalOpen} onClose={handleCloseModal}>
              <Form agentProfile={agentProfile} />
            </SideModal>
          </div>
        </div>
        <div className="w-full lg:w-2/3 pt-12 px-4 lg:pr-24 mb-12">
          <ButtonAction agentProfile={agentProfile} />
        </div>
      </div>
    </div>
  );
}
