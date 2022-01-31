import { User } from '../models';

export type AddSongSuggestionParams = {
  songInfo: SongInfo;
  playlistInfo: PlaylistInfo;
  suggestedByUserInfo: SuggestedByUserInfo;
};

export type RemoveSongSuggestionParams = {
  songID: string;
  playlistID: string;
};

export type AddUserParams = {
  userID: string;
  name: string;
  profilePic: string;
  followers: number;
  accessToken: string;
  refreshToken: string;
};

export type UpdateUserParams = {
  user: User;
}

export type TokenData = {
  access_token: string;
  refresh_token: string;
};

export type PlaylistInfo = {
  id: string;
  name: string;
  ownerID: string;
};

export type SongInfo = {
  id: string;
  name: string;
  artist: string;
  albumArt: string;
};

export type SuggestedByUserInfo = {
  id: string;
  name: string;
};
