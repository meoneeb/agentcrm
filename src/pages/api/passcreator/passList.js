// pages/api/passList.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
    const { passTemplateUid, start = 0, pageSize = 100, lastIdOfPriorPage, lastCreatedOnOfPriorPage, createdSince, modifiedSince } = req.query;
    const apiKey = process.env.PASSCREATOR_API_KEY;

    const queryParams = new URLSearchParams({
        start,
        pageSize,
        lastIdOfPriorPage,
        lastCreatedOnOfPriorPage,
        createdSince,
        modifiedSince
    });

    const url = `https://app.passcreator.com/api/pass/list/${passTemplateUid}?${queryParams}`;

    try {
        const response = await fetch(url, {
            headers: {
                'Authorization': apiKey,
                'Content-Type': 'application/json'
            }
        });

        const responseText = await response.text();
        
        if (!response.ok) {
            throw new Error(`Failed to fetch passes: ${response.status} - ${responseText}`);
        }

        const data = JSON.parse(responseText);
        res.status(200).json(data);
    } catch (error) {
        console.error('Error fetching passes:', error.message, 'Response:', error);
        res.status(500).json({ message: 'Failed to fetch passes', error: error.message });
    }
}
