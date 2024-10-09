const express = require('express');
const router = express.Router();
const CryptoStats = require('../models/cryptoStats');

router.get('/', async (req, res) => {
  try {
    const { coin } = req.query;

    if (!coin) {
      return res.status(400).json({ error: 'Coin parameter is required' });
    }

    const latestStats = await CryptoStats.findOne({ coin }).sort({ timestamp: -1 });

    if (!latestStats) {
      return res.status(404).json({ error: 'Stats not found for the specified coin' });
    }

    res.json({
      price: latestStats.priceUSD,
      marketCap: latestStats.marketCapUSD,
      "24hChange": latestStats.change24h
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;