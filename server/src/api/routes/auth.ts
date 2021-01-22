import express from 'express';
import { AuthDecoder } from '../../models/auth';
import Container from 'typedi';
import { SpotifyService } from '../../services/spotifyService';
import { validator } from '../middleware/validator';

const app = express.Router();

app.get('/api/authorize', async (req, res) => {
  try {
    const spotifyService = Container.get(SpotifyService);
    const loginURL = spotifyService.createAuthorizeURL();
    res.send({ loginURL });
  } catch (err) {
    res.send(err).status(500);
  }
});

app.post('/api/handle-token', validator(AuthDecoder), async (req, res) => {
  try {
    const spotifyService = Container.get(SpotifyService);
    const data = await spotifyService.handleToken(req.body);

    res.send(data);
  } catch (err) {
    res.send(err).status(500);
  }
});

app.post('/api/get-me', async (req, res) => {
  try {
    const spotifyService = Container.get(SpotifyService);
    const user = await spotifyService.getLoggedInUser({ accessToken: req.body.post });
    res.send({ me: user });
  } catch (err) {
    res.send(err).status(500);
  }
});

export default app;
