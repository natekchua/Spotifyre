const express = require('express');
const bodyParser = require('body-parser');

const app = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/subscribe', (req, res) => {

});

module.exports = app;
