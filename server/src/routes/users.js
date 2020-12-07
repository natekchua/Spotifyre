const express = require('express');
const action = require('../actions/actions.js');
const { SQL } = require('../db/sql.js');

const app = express.Router();

app.get('/getCurators', (req, res) => {
  action
    .getAllCurators()
    .then((rtn) => {
      res.send(rtn);
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.send({ error: err });
    });
});

app.get('/getCurators', (req, res) => {
  action
    .getAllCurators()
    .then((rtn) => {
      res.send(rtn);
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.send({ error: err });
    });
});

app.get('/getType', (req, res) => {
  action
    .getType()
    .then((rtn) => {
      res.send(rtn);
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.send({ error: err });
    });
});

app.get('/getPlaylistID', (req, res) => {
  const userID = req.body;

  action
    .getPlaylistID(userID)
    .then((rtn) => {
      res.send(rtn);
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.send({ error: err });
    });
});

app.get('/getAllPlaylists', (req, res) => {
  action
    .getAllPlaylists()
    .then((rtn) => {
      res.send(rtn);
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.send({ error: err });
    });
});

app.get('/getSuggestions', (req, res) => {
  const playlistID = req.body; // Need to define a paramter

  action
    .getSuggestions(playlistID)
    .then((rtn) => {
      res.send(rtn);
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.send({ error: err });
    });
});

app.post('/addSongSuggestion', (req, res) => {
  const { playlistID, songID, suggestedUserID, playlist, count } = req.body;

  action
    .addSongSuggestion(playlistID, songID, suggestedUserID, playlist, count)
    .then((rtn) => {
      res.send(rtn);
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.send({ error: err });
    });
});

app.post('/removeSong', (req, res) => {
  const { playlistID, songID } = req.body;

  action
    .removeSong(playlistID, songID)
    .then((rtn) => {
      res.send(rtn);
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.send({ error: err });
    });
});

app.post('/increaseCount', (req, res) => {
  const playlistID = req.body;

  action
    .increaseCount(playlistID)
    .then((rtn) => {
      res.send(rtn);
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.send({ error: err });
    });
});

app.post('/increaseCount', (req, res) => {
  const playlistID = req.body;

  action
    .decreaseCount(playlistID)
    .then((rtn) => {
      res.send(rtn);
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.send({ error: err });
    });
});

app.post('/db/save-settings', (req, res) => {
  const playlistID = req.body;

  action
    .decreaseCount(playlistID)
    .then((rtn) => {
      res.send(rtn);
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.send({ error: err });
    });
});

module.exports = app;
