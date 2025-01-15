// pages/api/decode-vin.js

export default async function handler(req, res) {
    if (req.method === 'GET') {
      const { vin } = req.query;
  
      if (!vin || vin.length !== 17) {
        return res.status(400).json({ error: 'Invalid VIN. A VIN must be 17 characters long.' });
      }
  
      try {
        const response = await fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${vin}?format=json`);
        const data = await response.json();
  
        if (response.ok) {
          const decodedData = data.Results.reduce((acc, item) => {
            if (item.Value && item.Variable) {
              acc[item.Variable] = item.Value;
            }
            return acc;
          }, {});
  
          res.status(200).json({ vin, decodedData });
        } else {
          res.status(500).json({ error: 'Failed to fetch vehicle information. Please try again.' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
      }
    } else {
      res.status(405).json({ error: 'Method not allowed. Use GET.' });
    }
  }
  