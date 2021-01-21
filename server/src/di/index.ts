import { permissions } from '../permissions';
import { Container } from 'typedi';
import { spotify } from '../spotifyUtils';

Container.set('spotifyApiClient', spotify);
Container.set('spotifyPermissions', permissions);
