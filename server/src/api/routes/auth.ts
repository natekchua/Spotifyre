import express from 'express';
import SpotifyWebApi from 'spotify-web-api-node';
import { spotify } from '../../spotifyUtils';
import * as actions from '../../actions';
import { permissions } from '../../permissions';

const app = express.Router();

app.get('/api/authorize', async (req, res) => {
  const authorizeURL = spotify.createAuthorizeURL(
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
      spotify.setAccessToken(data.body.access_token);
      spotify.setRefreshToken(data.body.refresh_token);
      const user = await spotify.getMe();
      await actions.setTokens(data.body, user.body);
      const tokens = {
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token
      };
      res.send({ tokens });
    },
    (err) => {
      console.log('Error: /api/handle-token', err);
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

export default app;
