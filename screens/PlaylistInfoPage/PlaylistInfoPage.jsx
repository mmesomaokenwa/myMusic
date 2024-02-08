import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query'
import { getData, getTracksFromPlaylist } from '../../api/fetchFunctions';
import PlaylistInfoSkeleton from '../../skeletons/PlaylistInfoSkeleton/PlaylistInfoSkeleton';
import Track from '../../components/TrackList/Track';
import { PlayButton, PauseButton, ShuffleButton } from '../../components/PlayButton/PlayButton';
import GoBackButton from '../../components/GoBackButton/GoBackButton';
import { playSong, pauseSong } from '../../utilityFunctions/utilityFunctions';
import './PlaylistInfoPage.css';
import DataContext from '../../context/DataContext';

const PlaylistInfoPage = () => {
  const { id } = useParams();

  const playBtnSize = {fontSize: '1.5rem'}

  const {viewedPlaylist, setViewedPlaylist, currentPlaylist, setCurrentPlaylist, setCurrentIndex, isPlaying, setIsPlaying, playingNow, token} = useContext(DataContext)
  
  const { data: playlistData, error, isLoading, refetch } = useQuery(
    ['playlist', id, token],  // the key for this query
    async () => { const response = await getData(token, `/playlists/${id}`); if (response) return response; throw new Error('Unable to fetch playlist'); }, // the funtion for this query
    {
      refetchOnReconnect: true, // Refresh data when the connection is reestablished. Default is `true`.
      refetchOnWindowFocus:  false, // Refresh data when the window regains focus. Default is `false`
      staleTime: Infinity, // The data remains fresh indefinitely (until it gets explicitly invalidated).
      onSuccess: (playlistData) => {
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
      },
      onError: (err) => console.log(`Error fetching playlist info: ${err}`),
    }
  );

  useEffect(() => {
    if (isPlaying) {
      document.querySelector('.playlist-play-btn')?.classList?.add('hidden')
      document.querySelector('.playlist-pause-btn')?.classList?.remove('hidden')
    } else {
      document.querySelector('.playlist-pause-btn')?.classList?.add('hidden')
      document.querySelector('.playlist-play-btn')?.classList?.remove('hidden')
    }
  }, [isPlaying])

  const handlePlayClick = () => {
    if (currentPlaylist !== viewedPlaylist.tracks) {
      setCurrentPlaylist(viewedPlaylist.tracks);
      setCurrentIndex(0);
    }
    setIsPlaying(true)
    playSong()
   }
  
  const handlePauseClick = () => {
    setIsPlaying(false);
    pauseSong();
  }
  
  const handleShuffleClick = () => {
    let shuffledTracks = viewedPlaylist.tracks.slice().sort(() => Math.random() - 0.5);
    setCurrentPlaylist(shuffledTracks)
    setCurrentIndex(0);
    setIsPlaying(true)
  }

  if (isLoading) return <PlaylistInfoSkeleton />;

  if (error) return <div>Error fetching playlist information</div>;

  return (
    <main className='playlist-page'>
      <section className="info-container" style={{backgroundImage: `url(${viewedPlaylist.image})`}} >
        <img src={viewedPlaylist?.image} alt="" />
        <div className='info'>
          <h1>{viewedPlaylist?.name}</h1>
          <p><strong>Owner: </strong>{viewedPlaylist?.owner}</p>
          <p><strong>Type: </strong>{viewedPlaylist?.type}</p>
          <p className='description'><strong>Description: </strong>{viewedPlaylist?.description || "No Description Provided"}</p>
        </div>
        <GoBackButton />
      </section>
      <div className="playlist-controls">
        <PlayButton className="playlist-play-btn" onClick={handlePlayClick} style={playBtnSize}/>
        <PauseButton className="playlist-pause-btn hidden" onClick={handlePauseClick} style={playBtnSize}/>
        <ShuffleButton className="playlist-shuffle-btn" onClick={handleShuffleClick}/>
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
  )
}

export default PlaylistInfoPage