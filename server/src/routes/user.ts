import express from 'express';
import SpotifyWebApi from 'spotify-web-api-node';
import * as actions from '../actions';
import bodyParser from 'body-parser';

const app = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ****** GETS ****** //

app.get('/top-tracks/:userID', async (req, res) => {
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

app.post('/get-me', (req, res) => {
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

export default app;
