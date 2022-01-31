import { addCuratorPlaylist } from './playlists';
import { prisma } from './prisma';
import { AddSongSuggestionParams, RemoveSongSuggestionParams } from './types';

export const getPlaylistSuggestions = async (playlistID: string) => {
  return await prisma.suggestions.findMany({
    where: {
      playlistid: playlistID
    }
  });
};

export const createSuggestion = async ({ playlistInfo, songInfo, suggestedByUserInfo }: AddSongSuggestionParams) => {
  return await prisma.suggestions.create({
    data: {
      songid: songInfo.id,
      song_title: songInfo.name,
      artist: songInfo.artist,
      album_art: songInfo.albumArt,
      playlist: playlistInfo.name,
      suggested_by_userid: suggestedByUserInfo.id,
      suggested_by_username: suggestedByUserInfo.name,
      count: 1,
      playlists: {
        connect: {
          playlistid: playlistInfo.id
        }
      }
    }
  });
};

export const addSongSuggestion = async ({ playlistInfo, songInfo, suggestedByUserInfo }: AddSongSuggestionParams) => {
  const playlistCount = await prisma.playlists.count({ where: { playlistid: playlistInfo.id } });

  if (playlistCount > 0) {
    return await createSuggestion({ suggestedByUserInfo, songInfo, playlistInfo });
  } else {
    await addCuratorPlaylist(playlistInfo);
    return await createSuggestion({ suggestedByUserInfo, songInfo, playlistInfo });
  }
};

export const removeSongSuggestion = async ({ songID, playlistID }: RemoveSongSuggestionParams) => {
  return await prisma.suggestions.delete({
    where: {
      songid_playlistid: {
        songid: songID,
        playlistid: playlistID
      }
    }
  });
};
