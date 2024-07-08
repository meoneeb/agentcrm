import fetch from 'node-fetch';

export default async function handler(req, res) {
    const { passUid } = req.query;
    const apiKey = process.env.PASSCREATOR_API_KEY;

    if (!passUid) {
        return res.status(400).json({ message: 'passUid is required' });
    }

    const url = `https://app.passcreator.com/api/pass/${passUid}`;

    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': apiKey,
                'Content-Type': 'application/json'
            }
        });

        const responseText = await response.text();
        
        if (!response.ok) {
            throw new Error(`Failed to fetch pass: ${response.status} - ${responseText}`);
        }

        const data = JSON.parse(responseText);
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching pass:', error.message, 'Response:', error);
        res.status(500).json({ message: 'Failed to fetch pass', error: error.message });
    }
}
