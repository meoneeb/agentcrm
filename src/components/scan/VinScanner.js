"use client";
import { useRef, useState, useEffect } from "react";
import Tesseract from "tesseract.js";

export default function VINScanner() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [vinNumber, setVinNumber] = useState("");
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
          video: { facingMode: "environment" }, // Back camera
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Camera access error:", error);
      }
    } else {
      console.error("Camera API not supported.");
    }
  };

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return null;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/png");
  };

  const scanVIN = async () => {
    setLoading(true);
    const image = captureImage();
    if (!image) {
      setLoading(false);
      return;
    }

    try {
      const { data } = await Tesseract.recognize(image, "eng", {
        tessedit_char_whitelist: "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      });

      const extractedText = data.text.replace(/\s+/g, "").toUpperCase();
      console.log("Raw OCR Text:", extractedText);

      // Extract a valid VIN number (17-character alphanumeric)
      const vinMatch = extractedText.match(/[A-HJ-NPR-Z0-9]{17}/);
      if (vinMatch) {
        setVinNumber(vinMatch[0]);
      } else {
        setVinNumber("No valid VIN found. Try again.");
      }
    } catch (error) {
      console.error("OCR Error:", error);
      setVinNumber("Error scanning VIN.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-lg font-bold mb-2">Scan Bike VIN</h2>
      <video ref={videoRef} autoPlay playsInline className="w-full max-w-sm" />
      <canvas ref={canvasRef} width="640" height="480" className="hidden" />
      <button
        onClick={scanVIN}
        className="mt-4 p-2 bg-blue-600 text-white rounded"
      >
        {loading ? "Scanning..." : "Scan VIN"}
      </button>
      {vinNumber && (
        <div className="mt-4 p-2 border rounded w-full max-w-sm bg-gray-100">
          <h3 className="text-lg font-semibold">Scanned VIN:</h3>
          <p className="text-sm font-mono">{vinNumber}</p>
        </div>
      )}
    </div>
  );
}
