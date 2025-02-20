"use client";
import { useRef, useState, useEffect } from "react";
import Tesseract from "tesseract.js";

export default function CameraScanner() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [scannedText, setScannedText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      startCamera();
    }
  }, []);

  const startCamera = async () => {
    if (navigator?.mediaDevices?.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    } else {
      console.error("Camera API not supported or running on the server.");
    }
  };

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/png");
  };

  const scanText = async () => {
    setLoading(true);
    const image = captureImage();
    if (!image) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await Tesseract.recognize(image, "eng");
      setScannedText(data.text);
    } catch (error) {
      console.error("OCR error:", error);
      setScannedText("Error scanning text.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <video ref={videoRef} autoPlay playsInline className="w-full max-w-sm" />
      <canvas ref={canvasRef} width="640" height="480" className="hidden" />
      <button
        onClick={scanText}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        {loading ? "Scanning..." : "Scan Text"}
      </button>
      {scannedText && (
        <div className="mt-4 p-2 border rounded w-full max-w-sm bg-gray-100">
          <h3 className="text-lg font-semibold">Scanned Text:</h3>
          <p className="text-sm">{scannedText}</p>
        </div>
      )}
    </div>
  );
}
