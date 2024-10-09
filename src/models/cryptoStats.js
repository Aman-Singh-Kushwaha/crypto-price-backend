const mongoose = require('mongoose');

const cryptoStatsSchema = new mongoose.Schema({
  coin: {
    type: String,
    required: true,
    enum: ['bitcoin', 'matic-network', 'ethereum'],
  },
  priceUSD: {
    type: Number,
    required: true,
  },
  marketCapUSD: {
    type: Number,
    required: true,
  },
  change24h: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('CryptoStats', cryptoStatsSchema);