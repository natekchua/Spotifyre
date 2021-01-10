import { User, Followers } from '../models';

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
  curatorSettings: any | null;
  profilePic: string;
  followers: number;
  accessToken: string;
  refreshToken: string;
};

export type UpdateUserParams = {
  user: User;
  newCurationSettings: any;
}

export type TokenData = {
  access_token: string;
  refresh_token: string;
};

// TODO: might need to mvoe to models
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
