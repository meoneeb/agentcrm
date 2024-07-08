import fetch from 'node-fetch';

export default async function handler(req, res) {
  const apiKey = process.env.PASSCREATOR_API_KEY;

  const url = 'https://app.passcreator.com/api/pass-template';

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': apiKey,
        'Content-Type': 'application/json',
      },
    });

    const body = await response.text();

    if (!response.ok) {
      throw new Error(`Failed to fetch pass templates: ${response.status} - ${body}`);
    }

    const json = JSON.parse(body);
    res.status(200).json(json);
  } catch (error) {
    console.error('Error fetching pass templates:', error);
    res.status(500).json({ message: 'Request error: ' + error.message });
  }
}
