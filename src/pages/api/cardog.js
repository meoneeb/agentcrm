export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const baseUrl = "https://api.cardog.com";
    const appKey = "5U4AQ6ZBS2KHKJHI1ZTLSO04K6IT9CDT";
    const apiKey = "5SMB0WTFKLTRUKT5DXY7PP09P8UERJ9U"; // Replace with your actual API key
    const rooftopID = "475";

    try {
        // Step 1: Login to get Token
        const loginResponse = await fetch(`${baseUrl}/api/Login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept": "application/json"
            },
            body: new URLSearchParams({
                appKey,
                apiKey
            })
        });

        const loginData = await loginResponse.json();
        if (!loginResponse.ok) {
            return res.status(401).json({ message: "Authentication failed", error: loginData });
        }

        const token = loginData.token;
        if (!token) {
            return res.status(401).json({ message: "Token not received" });
        }

        // Step 2: Fetch Inventory
        const inventoryResponse = await fetch(`${baseUrl}/api/Inventory?includeAllImageUrls=true`, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": `Bearer ${token}`,
                "RooftopID": rooftopID
            }
        });

        const inventoryData = await inventoryResponse.json();
        if (!inventoryResponse.ok) {
            return res.status(400).json({ message: "Error fetching inventory", error: inventoryData });
        }

        res.status(200).json({ inventory: inventoryData });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
}
