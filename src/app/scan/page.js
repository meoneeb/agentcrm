import CameraScanner from "@/components/vehicle/new/Scanner";

export default function ScannerPage() {
  return (
    <div className="flex flex-col items-center min-h-screen p-4">
      <h1 className="text-xl font-bold">Scan Text using Camera</h1>
      <CameraScanner />
    </div>
  );
}
