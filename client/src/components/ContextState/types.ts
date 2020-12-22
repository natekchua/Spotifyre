import { Dispatch, ReactNode } from 'react';
import { Tabs } from '../../types';

export type ContextStateActionType =
  | 'SET_TOKEN'
  | 'SET_NOTIFICATION'
  | 'SET_SUGGESTION_NOTIFICATIONS'
  | 'SET_TAB'
  | 'SET_SPOTIFY'
  | 'SET_USER'
  | 'CHECK_USER_SETTINGS'
  | 'SET_USER_SETTINGS'
  | 'SET_USER_SUGGESTIONS'
  | 'SET_CURATOR'
  | 'CHECK_CURATOR_SETTINGS'
  | 'SET_CURATOR_SETTINGS'
  | 'SET_CURATOR_SUGGESTIONS'
  | 'SET_PLAYLISTS'
  | 'SET_CURR_PLAYLIST'
  | 'SET_CURATOR_PLAYLIST'
  | 'SET_PLAYLIST_SEARCH_RESULTS'
  | 'SET_PLAYLIST_SEARCH_QUERY'
  | 'SET_IS_PLAYLIST_SEARCHING'
  | 'SET_IS_SONG_SEARCHING'
  | 'SET_SONGS_SEARCH_QUERY'
  | 'SET_SONGS_SEARCH_RESULTS'
  | 'SET_SONG_STATUS'
  | 'SET_CURR_SONG';

export type ContextStateAction = {
  [k in keyof ContextProviderState]?: any;
} & { type: ContextStateActionType };

export type ContextStateReducer = (
  state: ContextProviderState,
  action: ContextStateAction
) => ContextProviderState;

export type ContextProviderProps = [
  state: ContextProviderState,
  dispatch: Dispatch<ContextStateAction>
];

export type ProviderProps = {
  initialState: ContextProviderState;
  reducer: any;
  children?: ReactNode;
};

export interface ContextProviderState {
  token: string | null;
  notification: any;
  suggestionNotifications: any[];
  tab: Tabs;
  user: any;
  settingsSetByUser: boolean;
  userSettings: {
    curatorMode: boolean;
    maxSuggestions: number;
    suggestionsPerUser: number;
  };
  userSuggestions: any[];
  curator: any;
  settingsSetByCurator: boolean;
  curatorSettings: {
    curatorMode: boolean;
    maxSuggestions: number;
    suggestionsPerUser: number;
  };
  curatorSuggestions: any[];
  playlists: any[];
  currPlaylist: any;
  curatorPlaylist: any;
  isPlaylistSearching: boolean;
  playlistSearchQuery: any;
  playlistSearchResults: [];
  isSongSearching: boolean;
  songsSearchQuery: any;
  songsSearchResults: any[];
  songStatus: boolean;
  currSong: any;
  recentSongs: any;
  spotify: any;
  songObj: any;
  isPlaying: boolean;
}
