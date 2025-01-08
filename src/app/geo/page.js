import GeoLocation from "@/components/geo/GeoLocation";

export default function geo() {
  return (
    <div className="w-full bg-white">
      <div className="min-h-screen max-w-7xl w-full mx-auto p-8 ">
        <GeoLocation />
      </div>
    </div>
  );
}
