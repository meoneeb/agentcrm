// components/VinDecoder.js
'use client'
import { useState } from 'react';

const VinDecoder = () => {
  const [vin, setVin] = useState('');
  const [vehicleData, setVehicleData] = useState(null);
  const [error, setError] = useState('');

  const handleDecodeVin = async () => {
    setError('');
    setVehicleData(null);

    if (vin.length !== 17) {
      setError('VIN must be 17 characters long.');
      return;
    }

    try {
      const response = await fetch(`/api/vin/decode?vin=${vin}`);
      const data = await response.json();

      if (response.ok) {
        setVehicleData(data.decodedData);
      } else {
        setError(data.error || 'An error occurred while decoding the VIN.');
      }
    } catch (err) {
      setError('Failed to fetch vehicle information.');
    }
  };

  return (
    <div>
      <h1>VIN Decoder</h1>
      <input
        type="text"
        value={vin}
        onChange={(e) => setVin(e.target.value)}
        placeholder="Enter VIN (17 characters)"
        maxLength={17}
      />
      <button onClick={handleDecodeVin}>Decode VIN</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {vehicleData && (
        <div>
          <h2>Vehicle Information</h2>
          <ul>
            {Object.entries(vehicleData).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default VinDecoder;
