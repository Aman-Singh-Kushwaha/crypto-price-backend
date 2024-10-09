const express = require('express');
const cron = require('node-cron');
const connectDB = require('./config/db');
const fetchCryptoStats = require('./jobs/fetchCryptoStats');
const statsRoutes = require('./routes/stats');
const deviationRoutes = require('./routes/deviation')

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

app.use('/stats', statsRoutes);
app.use('/deviation', deviationRoutes);

// This is for fetching and storing the data on demand used for seeding databse
app.get('/fetch', async (req,res)=>{
  await fetchCryptoStats();
  return res.status(200).json({msg: "Fetched Successfully"})
})

cron.schedule('0 */2 * * *', () => {
  console.log('Running background job to fetch crypto stats');
  fetchCryptoStats();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});