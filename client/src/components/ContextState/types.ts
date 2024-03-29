import { Dispatch, ReactNode } from 'react';
import { Tabs } from '../../types';

export type ContextStateActionType =
  | 'SET_TOKEN'
  | 'SET_NOTIFICATION'
  | 'SET_SUGGESTION_NOTIFICATIONS'
  | 'SET_TAB'
  | 'SET_SPOTIFY'
  | 'SET_USER'
  | 'SET_USER_SUGGESTIONS'
  | 'SET_CURATOR'
  | 'SET_CURATOR_SUGGESTIONS'
  | 'SET_CURATORS'
  | 'SET_PLAYLISTS'
  | 'SET_CURR_PLAYLIST'
  | 'SET_CURATOR_PLAYLIST'
  | 'SET_PLAYLIST_SEARCH_RESULTS'
  | 'SET_PLAYLIST_SEARCH_QUERY'
  | 'SET_IS_PLAYLIST_SEARCHING'
  | 'SET_IS_SONG_SEARCHING'
  | 'SET_SONGS_SEARCH_QUERY'
  | 'SET_SONGS_SEARCH_RESULTS'
  | 'SET_IS_CURATOR_SEARCHING'
  | 'SET_CURATORS_SEARCH_QUERY'
  | 'SET_CURATORS_SEARCH_RESULTS'
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
  userSuggestions: any[];
  curator: any;
  curatorSuggestions: any[];
  curators: any[];
  playlists: any[];
  currPlaylist: any;
  curatorPlaylist: any;
  isPlaylistSearching: boolean;
  playlistSearchQuery: any;
  playlistSearchResults: [];
  isSongSearching: boolean;
  songsSearchQuery: any;
  songsSearchResults: any[];
  isCuratorSearching: boolean;
  curatorsSearchQuery: any;
  curatorsSearchResults: any[];
  songStatus: boolean;
  currSong: any;
  recentSongs: any;
  spotify: any;
  songObj: any;
  isPlaying: boolean;
}
