const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

app.get(
  '/weather/:locationId',
  async (req, res, next) => {
    const url = `https://www.metaweather.com/api/location/${req.params.locationId}/`;

    const response = await axios({
      method: 'GET',
      url,
    });

    req.data = response.data;
    next();
  },
  (req, res) => {
    res.json(req.data);
  }
);

app.listen(1234, () => {
  console.log('http://localhost:1234');
});
