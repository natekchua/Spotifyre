import { Service, Inject } from 'typedi';
import SpotifyWebApi from 'spotify-web-api-node';
import { permissions } from '../permissions';
import { setTokens } from '../actions';
import { Auth } from '../models/auth';

@Service()
export class SpotifyService {
  constructor(
    @Inject('spotifyApiClient') private spotifyApiClient: SpotifyWebApi
  ) { }

  createAuthorizeURL() {
    const url = this.spotifyApiClient.createAuthorizeURL(permissions, null, true);
    return url;
  }

  async handleToken({ code }: Auth) {
    try {
      const data = await this.spotifyApiClient.authorizationCodeGrant(code);

      // Set the access token on the API object to use it in later calls
      this.spotifyApiClient.setAccessToken(data.body.access_token);
      this.spotifyApiClient.setRefreshToken(data.body.refresh_token);
      const user = await this.getLoggedInUser({ accessToken: data.body.access_token });

      // TOOD: should this be implemented here?
      await setTokens(data.body, user);

      return {
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token
      };
    } catch (err) {
      // TODO: logging
      console.log('Error: /api/handle-token', err);
      throw new Error('Failed to authorize the client');
    }
  }

  // TODO:
  //   - normalize the user
  //   - add the DTO for this
  async getLoggedInUser(spotifyDto: { accessToken: string }) {
    this.spotifyApiClient.setAccessToken(spotifyDto.accessToken);
    const { body: user } = await this.spotifyApiClient.getMe();
    try {
      // TODO: logging
      console.log('Some information about the authenticated user', user);
      return user;
    } catch (err) {
      throw new Error('getLoggedInUser: Failed to get logged in user from Spotify API');
    }
  }
}
