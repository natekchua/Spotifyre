const express = require('express');
const bodyParser = require('body-parser');
const spotifyUtils = require('../../spotifyUtils.js');
const cors = require('cors');
const app = express.Router();

const { spotify, loginURL } = spotifyUtils;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

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
    (data) => {
      console.log('Some information about the authenticated user', data.body);
      res.send({ me: data.body });
    },
    (err) => {
      console.log('Something went wrong!', err);
    }
  );
});

app.get('/api/get-user-playlists', (req, res) => {
  spotify.getUserPlaylists({ limit: 50 }).then(
    (data) => {
      console.log('Retrieved playlists', data.body);
      res.send({ playlists: data.body });
    },
    (err) => {
      console.log('Something went wrong!', err);
    }
  );
});

app.post('/api/get-curator-playlists', (req, res) => {
  spotify.getUserPlaylists(req.body.post).then(
    (data) => {
      console.log('Retrieved playlists for selected user', data.body);
      res.send({ curatorPlaylists: data.body });
    },
    (err) => {
      console.log('Something went wrong!', err);
    }
  );
});

app.get('/api/get-playlist', (req, res) => {
  spotify.getPlaylist('37i9dQZF1DX7Jl5KP2eZaS').then(
    (data) => {
      console.log('Some information about this playlist', data.body);
      res.send({ playlist: data.body });
    },
    (err) => {
      console.log('Something went wrong!', err);
    }
  );
});

app.post('/api/select-playlist', (req, res) => {
  spotify.getPlaylist(req.body.post).then(
    (data) => {
      console.log('The selected playlist', data.body);
      res.send({ playlist: data.body });
    },
    (err) => {
      console.log('Something went wrong!', err);
    }
  );
});

app.get('/api/get-playback-state', (req, res) => {
  spotify.getMyCurrentPlaybackState().then(
    (data) => {
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
    (err) => {
      console.log('Something went wrong!', err);
    }
  );
});

app.get('/api/play', (req, res) => {
  spotify.play().then(
    () => console.log('Playback started'),
    (err) => console.log('Something went wrong!', err)
  );
  spotify.getMyCurrentPlaybackState().then(
    (data) => {
      if (data.body) {
        res.send({
          song: data.body,
          isPlaying: data.body.is_playing,
        });
      }
    },
    (err) => {
      console.log('Something went wrong!', err);
    }
  );
});

app.get('/api/pause', (req, res) => {
  spotify.pause().then(
    () => console.log('Playback paused'),
    (err) => console.log('Something went wrong!', err)
  );
  spotify.getMyCurrentPlaybackState().then(
    (data) => {
      if (data.body) {
        res.send({ isPlaying: data.body.is_playing });
      }
    },
    (err) => {
      console.log('Something went wrong!', err);
    }
  );
});

app.get('/api/previous-song', (req, res) => {
  spotify.skipToPrevious().then(
    (data) => {
      console.log('Skip to previous');
      res.send({ data });
    },
    (err) => {
      console.log('Something went wrong!', err);
    }
  );
});

app.get('/api/next-song', (req, res) => {
  spotify.skipToNext().then(
    (data) => {
      console.log('Skip to next');
      res.send({ data });
    },
    (err) => {
      console.log('Something went wrong!', err);
    }
  );
});

app.post('/api/play-song', (req, res) => {
  spotify.play({ uris: [`spotify:track:${req.body.post}`] }).then(
    (data) => {
      console.log('Song started');
      res.send({ data });
    },
    (err) => {
      console.log('Something went wrong!', err);
    }
  );
});

app.post('/api/play-playlist', (req, res) => {
  spotify.play({ context_uri: `spotify:playlist:${req.body.post}` }).then(
    (data) => {
      console.log('Playlist started');
      res.send({ data });
    },
    (err) => {
      console.log('Something went wrong!', err);
    }
  );
});

app.post('/api/search-for-songs', (req, res) => {
  spotify.searchTracks(req.body.post, { limit: 50 }).then(
    (data) => {
      console.log('Found songs are', data.body);
      res.send({ songsSearchResults: data.body });
    },
    (err) => {
      console.log('Something went wrong!', err);
    }
  );
});

app.post('/api/search-for-playlists', (req, res) => {
  spotify.searchPlaylists(req.body.post).then(
    (data) => {
      console.log('Found playlists are', data.body);
      res.send({ playlistSearchResults: data.body });
    },
    (err) => {
      console.log('Something went wrong!', err);
    }
  );
});

app.get('/api/featured-playlists', (req, res) => {
  spotify.getFeaturedPlaylists({ limit: 8 }).then(
    (data) => {
      console.log(data.body);
      res.send({ featured: data.body });
    },
    (err) => {
      console.log('Something went wrong!', err);
    }
  );
});

app.get('/api/top-tracks', (req, res) => {
  spotify.getMyTopTracks({ limit: 10 }).then(
    (data) => {
      console.log('Found top tracks', data.body);
      res.send({ topTracks: data.body.items });
    },
    (err) => {
      console.log('Something went wrong!', err);
    }
  );
});

app.post('/api/add-track-to-playlist', (req, res) => {
  const { playlistID, songID } = req.body.post;
  spotify.addTracksToPlaylist(playlistID, [`spotify:track:${songID}`]).then(
    (data) => {
      console.log('Added track to playlist!');
      res.send({ topTracks: data.body.items });
    },
    (err) => {
      console.log('Something went wrong!', err);
    }
  );
});

module.exports = app;
