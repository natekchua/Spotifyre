const express = require('express');
const bodyParser = require('body-parser');
const spotifyUtils = require('./spotifyUtils.js');
const app = express();
const port = process.env.PORT || 5000;

const { spotify, loginURL } = spotifyUtils;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send({ express: 'Welcome to Spotifyre!' });
});

app.get('/api/authenticate', (req, res) => {
  res.send({
    spotify: spotify,
    loginURL: loginURL,
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
