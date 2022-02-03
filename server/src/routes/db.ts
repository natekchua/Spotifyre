import express from 'express';
import * as actions from '../actions';

const app = express.Router();

// ****** GETS ****** //

app.get('/get-curator/:query', (req, res) => {
  actions
    .getCurator(req.params.query)
    .then((rtn) => {
      console.log('curator retrieved: ', rtn);
      res.send(rtn);
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.send({ error: err });
    });
});

app.get('/get-curators', (req, res) => {
  actions
    .getCurators()
    .then((rtn) => {
      console.log('curators retrieved: ', rtn);
      res.send(rtn);
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.send({ error: err });
    });
});

app.get('/get-notifications/:userID', async (req, res) => {
  try {
    const notifications = await actions.getNotifications(req.params.userID);
    console.log('notifications retrieved', { notifications });
    res.send(notifications);
  } catch (err) {
    console.error('Failed to get user notifications', err);
    res.status(500);
    res.send({ error: err });
  }
});

app.get('/get-playlist-id', (req, res) => {
  const userID = req.body;

  actions
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

app.get('/get-all-playlists', (req, res) => {
  actions
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

// ****** POSTS ****** //

app.post('/playlist-suggestions', (req, res) => {
  actions
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
  actions
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
  actions
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

export default app;
