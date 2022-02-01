import express from 'express';
import { spotify } from '../spotifyUtils';
import * as actions from '../actions';
import { permissions } from '../permissions';

const app = express.Router();

// ****** GETS ****** //

app.get('/', (req, res) => {
  res.send({ api: 'Welcome to Spotifyre!' });
});

app.get('/api/authorize', async (req, res) => {
  const authorizeURL = spotify.createAuthorizeURL(
    permissions,
    null,
    true
  );
  res.send({ loginURL: authorizeURL });
});

// ****** POSTS ****** //

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

export default app;
