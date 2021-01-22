import express from 'express';
import SpotifyWebApi from 'spotify-web-api-node';
import * as actions from '../../actions';

const app = express.Router();

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
          isPlaying: data.body.is_playing
        });
      } else {
        console.log('User is not playing anything, or doing so in private.');
        res.send({
          song: null,
          isPlaying: false
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
          isPlaying: data.body.is_playing
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

export default app;