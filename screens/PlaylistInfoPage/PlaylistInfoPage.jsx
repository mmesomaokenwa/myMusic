import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query'
import { getData, getTracksFromPlaylist } from '../../api/fetchFunctions';
import PlaylistInfoSkeleton from '../../skeletons/PlaylistInfoSkeleton/PlaylistInfoSkeleton';
import Track from '../../components/TrackList/Track';
import { FaPause, FaPlay } from "react-icons/fa";
import { FaShuffle } from "react-icons/fa6";
import './PlaylistInfoPage.css';
import DataContext from '../../context/DataContext';

const PlaylistInfoPage = () => {
  const { id } = useParams();

  const {viewedPlaylist, setViewedPlaylist, setCurrentPlaylist, setCurrentIndex, isPlaying, setIsPlaying, playingNow, token} = useContext(DataContext)
  
  const { data: playlistData, error, isLoading, refetch } = useQuery(
    ['playlist', id, token],  // the key for this query
    async () => { const response = await getData(token, `/playlists/${id}`); if (response) return response; throw new Error('Unable to fetch playlist'); }, // the funtion for this query
    {
      refetchOnReconnect: true, // Refresh data when the connection is reestablished. Default is `true`.
      refetchOnWindowFocus:  false, // Refresh data when the window regains focus. Default is `false`
      staleTime: Infinity, // The data remains fresh indefinitely (until it gets explicitly invalidated).
    }
  );
  
  useEffect(() => {
    if (playlistData) {
      document.title = `${playlistData?.name} | myMuic Playlist Info`;
      const { id: Id, name, type, description, primary_color, images: [{ url: image }], owner: { display_name: owner }, followers: { total: followers }, tracks: { items, total: numOfTracks } } = playlistData;
      const tracks = items.map((track, index)=> {
        return {
        number: index + 1,
        id:  track.track.id,
        name: track.track.name,
        artist: track.track.artists[0].name,
        image: track.track.album.images[1] ? track.track.album.images[1].url : track.track.album.images[0].url,
        audio: track.track.preview_url,
        length:  track.track.duration_ms / 1000
        }
      })
      setViewedPlaylist({ Id, name, type, description, primary_color, image, owner, numOfTracks, tracks, followers });
    }
  }, [playlistData])

  console.log(viewedPlaylist?.tracks)

  if (isLoading) return <PlaylistInfoSkeleton />;

  if (error) return <div>Error fetching playlist information</div>;

  return (
    // { viewedPlaylist && (
    <main className='playlist-page'>
      <section className="info-container" style={{backgroundImage: `url(${viewedPlaylist.image})`}} >
        <img src={viewedPlaylist?.image} alt="" />
        <div className='info'>
          <h1>{viewedPlaylist?.name}</h1>
          <p><strong>Owner: </strong>{viewedPlaylist?.owner}</p>
          <p><strong>Type: </strong>{viewedPlaylist?.type}</p>
          <p className='description'><strong>Description: </strong>{viewedPlaylist?.description || "No Description Provided"}</p>
        </div>
      </section>
      <div className="playlist-controls">
        <button className="playlist-play-btn"><FaPlay /></button>
        <button className="playlist-pause-btn hidden"><FaPause /></button>
        <button className="playlist-shuffle-btn"><FaShuffle /></button>
      </div>
      <section className="tracks-section">
        <ul className="track-list" onClick={() => setCurrentPlaylist(viewedPlaylist?.tracks)}>
          {viewedPlaylist?.tracks?.map((track, index) => (
            <Track key={track.id} track={track} index={index}
            isLoaded={track.id === playingNow?.id ? true : false}
            />
          ))}
        </ul>
      </section>
      </main> 
      // )}
  )
}

export default PlaylistInfoPage