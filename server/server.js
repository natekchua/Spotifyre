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

app.post('/api/set-access-token', (req, res) => {
  spotify.setAccessToken(req.body.post);
  res.send(`token: ${req.body.post} has been posted`);
});

app.get('/api/get-spotify', (req, res) => {
  res.send({ spotify: spotify });
});

app.get('/api/get-me', (req, res) => {
  spotify.getMe().then(
    function (data) {
      console.log('Some information about the authenticated user', data.body);
      res.send({ me: data.body });
    },
    function (err) {
      console.log('Something went wrong!', err);
    }
  );
});

app.get('/api/get-user-playlists', (req, res) => {
  spotify.getUserPlaylists().then(
    function (data) {
      console.log('Retrieved playlists', data.body);
      res.send({ playlists: data.body });
    },
    function (err) {
      console.log('Something went wrong!', err);
    }
  );
});

app.get('/api/get-playlist', (req, res) => {
  spotify.getPlaylist('37i9dQZF1EpmFBY9P2HI7S').then(
    function (data) {
      console.log('Some information about this playlist', data.body);
      res.send({ playlist: data.body });
    },
    function (err) {
      console.log('Something went wrong!', err);
    }
  );
});

app.post('/api/select-playlist', (req, res) => {
  spotify.getPlaylist(req.body.post).then(
    function (data) {
      console.log('The selected playlist', data.body);
      res.send({ playlist: data.body });
    },
    function (err) {
      console.log('Something went wrong!', err);
    }
  );
});

app.get('/api/get-playback-state', (req, res) => {
  spotify.getMyCurrentPlaybackState().then(
    function (data) {
      if (data.body && data.body.is_playing) {
        console.log('User is currently playing something!');
        res.send({
          song: data.body,
          isPlaying: data.body.is_playing,
        });
      } else {
        console.log('User is not playing anything, or doing so in private.');
        res.send({
          song: null,
          isPlaying: false,
        });
      }
    },
    function (err) {
      console.log('Something went wrong!', err);
    }
  );
});

app.get('/api/play', (req, res) => {
  spotify.play().then(
    function () {
      console.log('Playback started');
    },
    function (err) {
      console.log('Something went wrong!', err);
    }
  );
  spotify.getMyCurrentPlaybackState().then(
    function (data) {
      if (data.body) {
        res.send({
          song: data.body,
          isPlaying: data.body.is_playing,
        });
      }
    },
    function (err) {
      console.log('Something went wrong!', err);
    }
  );
});

app.get('/api/pause', (req, res) => {
  spotify.pause().then(
    function () {
      console.log('Playback paused');
    },
    function (err) {
      console.log('Something went wrong!', err);
    }
  );
  spotify.getMyCurrentPlaybackState().then(
    function (data) {
      if (data.body) {
        res.send({ isPlaying: data.body.is_playing });
      }
    },
    function (err) {
      console.log('Something went wrong!', err);
    }
  );
});

app.get('/api/previous-song', (req, res) => {
  spotify.skipToPrevious().then(
    function (data) {
      console.log('Skip to previous');
      res.send({ data });
    },
    function (err) {
      console.log('Something went wrong!', err);
    }
  );
});

app.get('/api/next-song', (req, res) => {
  spotify.skipToNext().then(
    function (data) {
      console.log('Skip to next');
      res.send({ data });
    },
    function (err) {
      console.log('Something went wrong!', err);
    }
  );
});

app.post('/api/play-song', (req, res) => {
  spotify.play({ uris: [`spotify:track:${req.body.post}`] }).then(
    function (data) {
      console.log('Song started');
      res.send({ data });
    },
    function (err) {
      console.log('Something went wrong!', err);
    }
  );
});

app.post('/api/play-playlist', (req, res) => {
  spotify.play({ context_uri: `spotify:playlist:${req.body.post}` }).then(
    function (data) {
      console.log('Playlist started');
      res.send({ data });
    },
    function (err) {
      console.log('Something went wrong!', err);
    }
  );
});

app.listen(port, () => console.log(`Listening on port ${port}`));
