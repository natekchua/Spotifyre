import express from 'express';
import SpotifyWebApi from 'spotify-web-api-node';
import * as actions from '../../actions';

const app = express.Router();

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

app.post('/api/search-for-playlists', async (req, res) => {
  const { query, userID } = req.body.post;
  const loggedInSpotify = new SpotifyWebApi();
  const userAccessToken = await actions.getUserToken(userID);
  loggedInSpotify.setAccessToken(userAccessToken);
  loggedInSpotify.searchPlaylists(query, { limit: 50 }).then(
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
  try {
    const userAccessToken = await actions.getUserToken(userID);
    loggedInSpotify.setAccessToken(userAccessToken);
    // typing provided with the spotify lib is kinda weird and body.items is not showing up??
    const data = await loggedInSpotify.addTracksToPlaylist(playlistID, [`spotify:track:${songID}`]) as any;
    if (data?.body?.items) {
      res.send({ topTracks: data?.body?.items });
    }
  } catch (err) {
    console.log('Something went wrong!', err);
  }
});

export default app;