'use client'
import { useState, useEffect } from "react";

function InventoryList() {
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchInventory() {
            try {
                const response = await fetch("/api/cardog");
                const data = await response.json();

                console.log("API Response:", data); // Debugging log

                // Check if data.inventory.vehicleList exists and is an array
                if (data.inventory && Array.isArray(data.inventory.vehicleList)) {
                    setInventory(data.inventory.vehicleList);
                } else {
                    throw new Error("Vehicle list is missing or not an array");
                }
            } catch (err) {
                console.error("Fetch error:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchInventory();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h2>Inventory List</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                {inventory.map((vehicle) => (
                    <div key={vehicle.inventoryID} style={{ border: "1px solid #ddd", padding: "10px", width: "250px" }}>
                        <img src={vehicle.imageUrl} alt={vehicle.displayName} style={{ width: "100%" }} />
                        <h3>{vehicle.year} {vehicle.make} {vehicle.model}</h3>
                        <p><strong>Price:</strong> ${vehicle.askingPrice}</p>
                        <p><strong>Stock No:</strong> {vehicle.stockNumber}</p>
                        <p><strong>Status:</strong> {vehicle.status}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default InventoryList;
