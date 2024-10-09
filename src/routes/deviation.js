const express = require('express');
const router = express.Router();
const CryptoStats = require('../models/cryptoStats');

function calculateStandardDeviation(prices) {
  const n = prices.length;
  if (n < 2) return 0;
  const mean = prices.reduce((sum, price) => sum + price, 0) / n;
  const squaredDifferences = prices.map(price => Math.pow(price - mean, 2));
  const variance = squaredDifferences.reduce((sum, sqDiff) => sum + sqDiff, 0) / n;
  return Math.sqrt(variance);
}

router.get('/', async (req, res) => {
  try {
    const { coin } = req.query;

    if (!coin) {
      return res.status(400).json({ error: 'Coin parameter is required' });
    }

    const records = await CryptoStats.find({ coin })
      .sort({ timestamp: -1 })
      .limit(100)
      .select('priceUSD');

    if (records.length === 0) {
      return res.status(404).json({ error: 'No records found for the specified coin' });
    }

    const prices = records.map(record => record.priceUSD);

    const deviation = calculateStandardDeviation(prices);

    res.json({
      deviation: parseFloat(deviation.toFixed(2))
    });
  } catch (error) {
    console.error('Error calculating deviation:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;