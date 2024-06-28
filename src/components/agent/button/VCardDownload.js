import StyledButton from "./Styled";

export default function VCardDownload({agentProfile, vcard}) {
  const handleVCard = () => {
    window.open(agentProfile.vcard, "_blank");
  };
  return (
    <StyledButton onClick={handleVCard} className={`w-full`}>
      Save my Business Card
    </StyledButton>
  );
}
