const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3000;

const STEAM_API_KEY = process.env.STEAM_API_KEY;
const STEAM_ID = process.env.STEAM_ID;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Endpoint to fetch player summaries
app.get('/api/steam/recent', async (req, res) => {
  try {
    const url = `https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/?key=${STEAM_API_KEY}&steamid=${STEAM_ID}`;
    const response = await fetch(url);
    res.json(await response.json());
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Steam data' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
