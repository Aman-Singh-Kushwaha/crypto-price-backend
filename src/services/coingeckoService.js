const axios = require('axios');

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3';

const fetchCoinData = async (coinId) => {
  try {
    const response = await axios.get(`${COINGECKO_API_URL}/simple/price`, {
      params: {
        ids: coinId,
        vs_currencies: 'usd',
        include_market_cap: 'true',
        include_24hr_change: 'true',
      },
      headers: {
        'x-cg-api-key': process.env.COINGECKO_API_KEY,
      },
    });

    const coinData = response.data[coinId];

    return {
      current_price: coinData.usd,
      market_cap: coinData.usd_market_cap,
      price_change_percentage_24h: coinData.usd_24h_change,
    };
  } catch (error) {
    console.error(`Error fetching data for ${coinId}:`, error);
    throw error;
  }
};

module.exports = { fetchCoinData };