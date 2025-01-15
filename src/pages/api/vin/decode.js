// pages/api/decode-vin.js

import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { vin } = req.query;

    if (!vin || vin.length !== 17) {
      return res.status(400).json({ error: 'Invalid VIN. A VIN must be 17 characters long.' });
    }

    const apiKey = '0986cee53c87';
    const apiSecret = '834d5848b1';

    // Ensure VIN is in uppercase
    const vinUpper = vin.toUpperCase();

    // Generate the Control Sum by hashing VIN|API Key|Secret Key
    const controlSum = generateControlSum(vinUpper, apiKey, apiSecret);

    try {
      // Construct the API URL with Control Sum
      const apiUrl = `https://api.vindecoder.eu/3.2/${apiKey}/${controlSum}/decode/${vinUpper}.json`;
      console.log(apiUrl)
      
      // Fetch data from the VIN decoder API
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (response.ok) {
        res.status(200).json({ vin: vinUpper, decodedData: data });
      } else {
        res.status(response.status).json({
          error: data.error || 'Failed to fetch vehicle information from VIN decoder.',
        });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed. Use GET.' });
  }
}

// Function to generate the Control Sum
function generateControlSum(vin, apiKey, apiSecret) {
  // Create the input string for hashing
  const input = vin + '|' + apiKey + '|' + apiSecret;
  
  // Create the SHA1 hash of the input string
  const hash = crypto.createHash('sha1').update(input).digest('hex');

  // Return the first 10 characters of the SHA1 hash as the Control Sum
  return hash.substring(0, 10);
}
