'use client'
import { useEffect, useState } from 'react';

const DataPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/mongo/get-user-data');
                const result = await response.json();
                setData(result.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h1>Data from MongoDB</h1>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>
                        {/* Render fields from your MongoDB documents */}
                        <strong>{item.firstname}</strong>: {item.lastname}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DataPage;
