const CryptoStats = require('../models/cryptoStats');
const { fetchCoinData } = require('../services/coingeckoService');

const coins = ['bitcoin', 'matic-network', 'ethereum'];

const fetchCryptoStats = async () => {
  try {
    for (const coin of coins) {
      const data = await fetchCoinData(coin);
      
      await CryptoStats.create({
        coin,
        priceUSD: data.current_price,
        marketCapUSD: data.market_cap,
        change24h: data.price_change_percentage_24h,
      }).then(console.log("Stored ",coin));

      console.log(`Stats for ${coin} fetched and stored successfully`);
    }
  } catch (error) {
    console.error('Error fetching and storing crypto stats:', error);
  }
};

module.exports = fetchCryptoStats;