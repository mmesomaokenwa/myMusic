import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getData, getTracksFromPlaylist } from '../../api/fetchFunctions';
import './PlaylistCard.css';
import { playSong, pauseSong } from '../../utilityFunctions/utilityFunctions';
import { PlayButton, PauseButton } from '../PlayButton/PlayButton';
import DataContext from '../../context/DataContext';
import { useQuery } from 'react-query';

const Playlistcard = ({ playlist, index, changed, setChanged, isLoad }) => {
    const {token, setCurrentPlaylist, setCurrentIndex, isPlaying, setIsPlaying, clicked, setClicked} = useContext(DataContext)

    const backgroundImageUrl = `url("${playlist.image}")`;
    const navigate = useNavigate();

    const { data: tracks, error, isLoading } = useQuery(
        ['tracks', clicked],
        async () => { const response = await getTracksFromPlaylist(token, clicked.id); if (response) return response; throw new Error('Failed to fetch tracks') },
        {
            enabled: clicked && clicked.id === playlist.id,
            onSuccess: (tracks) => { 
                if (isPlaying && changed) setCurrentPlaylist(tracks)
            },
            onError: (err) => console.log('Failed to fetch tracks',  err),
            staleTime: Infinity // Keep the data fresh forever until it's no longer needed
        }
    )
     

    useEffect(() => {
        if (isLoad && isPlaying && changed) {
            document.querySelectorAll('.play-btn')[index]?.classList.add('hidden');
            document.querySelectorAll('.pause-btn')[index]?.classList.remove('hidden');
        } else if (!isLoad && !isPlaying && changed) {
            document.querySelectorAll('.play-btn')[index]?.classList.remove('hidden');
            document.querySelectorAll('.pause-btn')[index]?.classList.add('hidden');
        } else if (isLoad && !isPlaying && changed) {
            document.querySelectorAll('.play-btn')[index]?.classList.remove('hidden');
            document.querySelectorAll('.pause-btn')[index]?.classList.add('hidden');
        } else if (!isLoad && !changed && !isPlaying) {
            document.querySelectorAll('.play-btn')[index]?.classList.remove('hidden');
            document.querySelectorAll('.pause-btn')[index]?.classList.add('hidden');
        } else {
            document.querySelectorAll('.play-btn')[index]?.classList.remove('hidden');
            document.querySelectorAll('.pause-btn')[index]?.classList.add('hidden');
        }
    }, [isPlaying, isLoad])

    const handlePlaylistClick = (e) => {
        e.preventDefault()
        navigate(`/playlist/${playlist.id}`)
        setChanged(false)
        setClicked(playlist)
    }
    
    const handlePlayClick = e => {
        e.stopPropagation()
        setClicked(playlist)
        setChanged(true)
        if (!isLoad) {
            setIsPlaying(true)
            setCurrentIndex(0);
            playSong()
        }
        else {
            setIsPlaying(true);
            playSong()
        }
    }

    const handlePauseClick = e => {
        e.stopPropagation()
        setIsPlaying(false);
        pauseSong()
    };
    
  return (
      <div key={playlist.id}
          className='playlist-card'
          style={{ background: backgroundImageUrl }}
          onClick={handlePlaylistClick}
      >
        <div className='playlist-info'>
            <div>
                <p className="playlist-name">{playlist.name}</p>
                <p className="track-length">{ `${playlist.length} Songs`}</p>
            </div>
            <PlayButton className='play-btn' onClick={handlePlayClick} />
            <PauseButton className='pause-btn hidden' onClick={handlePauseClick} />
        </div>
    </div>
  )
}

export default Playlistcard