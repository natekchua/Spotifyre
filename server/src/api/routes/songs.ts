import express from 'express';
import SpotifyWebApi from 'spotify-web-api-node';
import * as actions from '../../actions';

const app = express.Router();

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

export default app;