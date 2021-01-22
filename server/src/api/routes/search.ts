import express from 'express';
import SpotifyWebApi from 'spotify-web-api-node';
import * as actions from '../../actions';

const app = express.Router();

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

export default app;