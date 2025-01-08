"use client";
import { useEffect, useState } from "react";

export default function GeoLocation() {
  const [coords, setCoords] = useState(null);
  const [error, setError] = useState(null);
  const [isSameLocation, setIsSameLocation] = useState(null);

  const store = {
    latitude: 31.500901641198524,
    longitude: 74.42787959174711,
  };

  useEffect(() => {
    // Function to get geolocation with high accuracy
    const getGeoLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCoords({ latitude, longitude }); // Store coordinates
          },
          (err) => {
            setError("Geolocation error: " + err.message);
          },
          {
            enableHighAccuracy: true, // Request high accuracy
            timeout: 5000, // Timeout after 5 seconds
            maximumAge: 0, // No cache, always request fresh location
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    };

    // Call the function to get geolocation when the component mounts
    getGeoLocation();
  }, []);

  // Haversine formula to calculate distance in kilometers
  const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const toRadians = (degree) => degree * (Math.PI / 180);

    const R = 6371; // Radius of the Earth in km
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  };

  // Function to compare user coordinates with store's coordinates
  const compareLocation = () => {
    if (coords) {
      const distance = haversineDistance(
        coords.latitude,
        coords.longitude,
        store.latitude,
        store.longitude
      );

      const tolerance = 5; // 1 km tolerance

      if (distance <= tolerance) {
        setIsSameLocation(true); // Locations are within 1 km radius
      } else {
        setIsSameLocation(false); // Locations are more than 1 km apart
      }
    }
  };

  // Trigger the comparison when the coordinates are available
  useEffect(() => {
    if (coords) {
      compareLocation();
    }
  }, [coords]);

  return (
    <div>
      <h1 className="text-4xl mb-8">GeoLocation</h1>
      <div className="border border-gray-400 w-fit p-4 bg-gray-100 mb-6">
        <h3 className="font-bold">Current Coordinates</h3>
        {error && <p className="text-red-500">{error}</p>}
        {coords ? (
          <p>
            Latitude: {coords.latitude}, Longitude: {coords.longitude}
          </p>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="border border-gray-400 w-fit p-4 bg-gray-100 mb-6">
        <h3 className="font-bold">Store's Coordinates</h3>
        {store ? (
          <p>
            Latitude: {store.latitude}, Longitude: {store.longitude}
          </p>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="border border-gray-400 w-fit p-4 bg-gray-100">
        <h3 className="font-bold">Location Comparison</h3>
        {isSameLocation === null ? (
          <p>Comparing location...</p>
        ) : isSameLocation ? (
          <p>The current location is within 1 km of the store's location!</p>
        ) : (
          <p>The current location is more than 1 km away from the store's location.</p>
        )}
      </div>
    </div>
  );
}
