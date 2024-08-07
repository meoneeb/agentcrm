import fetch from "node-fetch";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    const { passtemplate } = req.query;
    const apiKey = process.env.PASSCREATOR_API_KEY;
    const payload = req.body.genericProperties;

    try {
        const response = await fetch(
            `https://app.passcreator.com/api/pass?passtemplate=${passtemplate}&zapierStyle=true`,
            {
                method: "POST",
                headers: {
                    Authorization: apiKey,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload)
            }
        );

        const data = await response.json();

        if (!response.ok) {
            throw new Error(
                `Failed to create pass: ${response.status} - ${data.message}`
            );
        }

        res.status(200).json(data);
    } catch (error) {
        console.error("Error creating pass:", error.message);
        res.status(500).json({
            message: "Failed to create pass",
            error: error.message,
        });
    }
}
