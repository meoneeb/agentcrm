"use client";
import StyledButton from "@/components/agent/button/Styled";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter(); // Correctly call useRouter

  const handleClick = () => {
    router.push("/agent/oneeb-faisal"); // Replace with the desired link
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="drop-shadow-[0_0_0.3rem_#ffffff70]">
        <StyledButton onClick={handleClick}>Go to AgentPage</StyledButton>
      </div>
    </main>
  );
}
