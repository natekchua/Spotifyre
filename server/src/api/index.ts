import express from 'express';
import bodyParser from 'body-parser';
import auth from './routes/auth';
import playlists from './routes/playlists';
import search from './routes/search';
import playback from './routes/playback';
import songs from './routes/songs';
import users from './routes/users';

const app = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(auth);
app.use(playlists);
app.use(songs);
app.use(search);
app.use(playback);

app.use('/user', users);

export default app;
