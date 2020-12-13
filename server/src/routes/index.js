const express = require('express');
const bodyParser = require('body-parser');
const spotifyUtils = require('../../spotifyUtils.js');
const actions = require('../actions/actions.js');
const SpotifyWebApi = require('spotify-web-api-node');
const permissions = require('../../permissions.js');
const app = express.Router();

const { spotify } = spotifyUtils;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send({ express: 'Welcome to Spotifyre!' });
});

app.get('/api/authorize', async (req, res) => {
  const authorizeURL = await spotify.createAuthorizeURL(
    permissions,
    null,
    true
  );
  res.send({ loginURL: authorizeURL });
});

app.post('/api/handle-token', (req, res) => {
  spotify.authorizationCodeGrant(req.body.post).then(
    async (data) => {
      // Set the access token on the API object to use it in later calls
      spotify.setAccessToken(data.body['access_token']);
      spotify.setRefreshToken(data.body['refresh_token']);
      const user = await spotify.getMe();
      await actions.setTokens(data.body, user.body);
      const tokens = {
        accessToken: data.body['access_token'],
        refreshToken: data.body['refresh_token'],
      };
      res.send({ tokens });
    },
    (err) => {
      console.log('Something went wrong!', err);
    }
  );
});

app.post('/api/get-me', (req, res) => {
  const loggedInSpotify = new SpotifyWebApi();
  loggedInSpotify.setAccessToken(req.body.post);
  loggedInSpotify.getMe().then(
    async (data) => {
      console.log('Some information about the authenticated user', data.body);
      res.send({ me: data.body });
    },
    (err) => {
      console.log('Something went wrong!', err);
    }
  );
});

app.get('/api/get-user-playlists/:userID', async (req, res) => {
  const loggedInSpotify = new SpotifyWebApi();
  const userAccessToken = await actions.getUserToken(req.params.userID);
  loggedInSpotify.setAccessToken(userAccessToken);
  loggedInSpotify.getUserPlaylists({ limit: 50 }).then(
    (data) => {
      console.log('Retrieved playlists', data.body);
      res.send({ playlists: data.body });
    },
    (err) => {
      console.log('Something went wrong!', err);
    }
  );
});

app.get('/api/get-playlist/:userID', async (req, res) => {
  const loggedInSpotify = new SpotifyWebApi();
  const userAccessToken = await actions.getUserToken(req.params.userID);
  loggedInSpotify.setAccessToken(userAccessToken);
  loggedInSpotify.getPlaylist('37i9dQZF1DX7Jl5KP2eZaS').then(
    (data) => {
      console.log('Some information about this playlist', data.body);
      res.send({ playlist: data.body });
    },
    (err) => {
      console.log('Something went wrong!', err);
    }
  );
});

app.get('/api/get-playback-state/:userID', async (req, res) => {
  const loggedInSpotify = new SpotifyWebApi();
  const userAccessToken = await actions.getUserToken(req.params.userID);
  loggedInSpotify.setAccessToken(userAccessToken);
  loggedInSpotify.getMyCurrentPlaybackState().then(
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

app.get('/api/play/:userID', async (req, res) => {
  const loggedInSpotify = new SpotifyWebApi();
  const userAccessToken = await actions.getUserToken(req.params.userID);
  loggedInSpotify.setAccessToken(userAccessToken);
  loggedInSpotify.play().then(
    () => console.log('Playback started'),
    (err) => console.log('Something went wrong!', err)
  );
  loggedInSpotify.getMyCurrentPlaybackState().then(
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

app.get('/api/pause/:userID', async (req, res) => {
  const loggedInSpotify = new SpotifyWebApi();
  const userAccessToken = await actions.getUserToken(req.params.userID);
  loggedInSpotify.setAccessToken(userAccessToken);
  loggedInSpotify.pause().then(
    () => console.log('Playback paused'),
    (err) => console.log('Something went wrong!', err)
  );
  loggedInSpotify.getMyCurrentPlaybackState().then(
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

app.get('/api/previous-song/:userID', async (req, res) => {
  const loggedInSpotify = new SpotifyWebApi();
  const userAccessToken = await actions.getUserToken(req.params.userID);
  loggedInSpotify.setAccessToken(userAccessToken);
  loggedInSpotify.skipToPrevious().then(
    (data) => {
      console.log('Skip to previous');
      res.send({ data });
    },
    (err) => {
      console.log('Something went wrong!', err);
    }
  );
});

app.get('/api/next-song/:userID', async (req, res) => {
  const loggedInSpotify = new SpotifyWebApi();
  const userAccessToken = await actions.getUserToken(req.params.userID);
  loggedInSpotify.setAccessToken(userAccessToken);
  loggedInSpotify.skipToNext().then(
    (data) => {
      console.log('Skip to next');
      res.send({ data });
    },
    (err) => {
      console.log('Something went wrong!', err);
    }
  );
});

app.get('/api/featured-playlists/:userID', async (req, res) => {
  const loggedInSpotify = new SpotifyWebApi();
  const userAccessToken = await actions.getUserToken(req.params.userID);
  loggedInSpotify.setAccessToken(userAccessToken);
  loggedInSpotify.getFeaturedPlaylists({ limit: 8 }).then(
    (data) => {
      console.log(data.body);
      res.send({ featured: data.body });
    },
    (err) => {
      console.log('Something went wrong!', err);
    }
  );
});

app.get('/api/top-tracks/:userID', async (req, res) => {
  const loggedInSpotify = new SpotifyWebApi();
  const userAccessToken = await actions.getUserToken(req.params.userID);
  loggedInSpotify.setAccessToken(userAccessToken);
  loggedInSpotify.getMyTopTracks({ limit: 10 }).then(
    (data) => {
      console.log('Found top tracks', data.body);
      res.send({ topTracks: data.body.items });
    },
    (err) => {
      console.log('Something went wrong!', err);
    }
  );
});

// ****** POSTS ****** //
app.post('/api/get-curator-playlists', async (req, res) => {
  const { curatorID, userID } = req.body.post;
  const loggedInSpotify = new SpotifyWebApi();
  const userAccessToken = await actions.getUserToken(userID);
  loggedInSpotify.setAccessToken(userAccessToken);
  loggedInSpotify.getUserPlaylists(curatorID).then(
    (data) => {
      console.log('Retrieved playlists for selected user', data.body);
      res.send({ curatorPlaylists: data.body });
    },
    (err) => {
      console.log('Something went wrong!', err);
    }
  );
});

app.post('/api/select-playlist', async (req, res) => {
  const { playlistID, userID } = req.body.post;
  const loggedInSpotify = new SpotifyWebApi();
  const userAccessToken = await actions.getUserToken(userID);
  loggedInSpotify.setAccessToken(userAccessToken);
  loggedInSpotify.getPlaylist(playlistID).then(
    (data) => {
      console.log('The selected playlist', data.body);
      res.send({ playlist: data.body });
    },
    (err) => {
      console.log('Something went wrong!', err);
    }
  );
});

app.post('/api/play-song', async (req, res) => {
  const { songID, userID } = req.body.post;
  const loggedInSpotify = new SpotifyWebApi();
  const userAccessToken = await actions.getUserToken(userID);
  loggedInSpotify.setAccessToken(userAccessToken);
  loggedInSpotify.play({ uris: [`spotify:track:${songID}`] }).then(
    (data) => {
      console.log('Song started');
      res.send({ data });
    },
    (err) => {
      console.log('Something went wrong!', err);
    }
  );
});

app.post('/api/play-playlist', async (req, res) => {
  const { playlistID, userID } = req.body.post;
  const loggedInSpotify = new SpotifyWebApi();
  const userAccessToken = await actions.getUserToken(userID);
  loggedInSpotify.setAccessToken(userAccessToken);
  loggedInSpotify.play({ context_uri: `spotify:playlist:${playlistID}` }).then(
    (data) => {
      console.log('Playlist started');
      res.send({ data });
    },
    (err) => {
      console.log('Something went wrong!', err);
    }
  );
});

app.post('/api/search-for-songs', async (req, res) => {
  const { query, userID } = req.body.post;
  const loggedInSpotify = new SpotifyWebApi();
  const userAccessToken = await actions.getUserToken(userID);
  loggedInSpotify.setAccessToken(userAccessToken);
  loggedInSpotify.searchTracks(query, { limit: 50 }).then(
    (data) => {
      console.log('Found songs are', data.body);
      res.send({ songsSearchResults: data.body });
    },
    (err) => {
      console.log('Something went wrong!', err);
    }
  );
});

app.post('/api/search-for-playlists', async (req, res) => {
  const { query, userID } = req.body.post;
  const loggedInSpotify = new SpotifyWebApi();
  const userAccessToken = await actions.getUserToken(userID);
  loggedInSpotify.setAccessToken(userAccessToken);
  loggedInSpotify.searchPlaylists(query).then(
    (data) => {
      console.log('Found playlists are', data.body);
      res.send({ playlistSearchResults: data.body });
    },
    (err) => {
      console.log('Something went wrong!', err);
    }
  );
});

app.post('/api/add-track-to-playlist', async (req, res) => {
  const { playlistID, songID, userID } = req.body.post;
  const loggedInSpotify = new SpotifyWebApi();
  const userAccessToken = await actions.getUserToken(userID);
  loggedInSpotify.setAccessToken(userAccessToken);
  loggedInSpotify
    .addTracksToPlaylist(playlistID, [`spotify:track:${songID}`])
    .then(
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
