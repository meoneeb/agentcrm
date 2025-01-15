// pages/index.js

import VinDecoder from "@/components/vin/DecoderVin";

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <VinDecoder />
    </div>
  );
}
