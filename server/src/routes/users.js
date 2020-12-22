const express = require('express');
const bodyParser = require('body-parser');
const action = require('../actions/actions.js');
const app = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.post('/decreaseCount', (req, res) => {
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

// ****** SETTINGS ****** //

app.post('/get-settings', (req, res) => {
  action
    .getUserSettings(req.body.post)
    .then((rtn) => {
      console.log('user settings retrieved: ', rtn);
      res.send(rtn);
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.send({ error: err });
    });
});

app.post('/update-settings', (req, res) => {
  action
    .updateUserSettings(req.body.post)
    .then((rtn) => {
      console.log('updated settings');
      res.send(rtn);
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.send({ error: err });
    });
});

// ****** SUGGESTIONS ****** //

app.post('/playlist-suggestions', (req, res) => {
  action
    .getPlaylistSuggestions(req.body.post)
    .then((rtn) => {
      console.log('retrieved playlist suggestions');
      res.send(rtn);
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.send({ error: err });
    });
});

app.post('/suggest-song', (req, res) => {
  action
    .addSongSuggestion(req.body.post)
    .then((rtn) => {
      console.log('song sucessfully suggested: ', rtn);
      res.send(rtn);
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.send({ error: err });
    });
});

app.post('/remove-suggestion', (req, res) => {
  action
    .removeSongSuggestion(req.body.post)
    .then((rtn) => {
      console.log('suggestion removed: ', rtn);
      res.send(rtn);
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.send({ error: err });
    });
});

app.get('/get-notifications/:userID', (req, res) => {
  action
    .getNotifications(req.params.userID)
    .then((rtn) => {
      console.log('notifications retrieved: ', rtn);
      res.send(rtn);
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.send({ error: err });
    });
});

module.exports = app;
