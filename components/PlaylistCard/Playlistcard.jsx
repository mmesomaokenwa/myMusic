import React, { useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPause, FaPlay } from "react-icons/fa";
import { getData, getTracksFromPlaylist } from '../../api/fetchFunctions';
import './PlaylistCard.css';
import { playSong, pauseSong } from '../../utilityFunctions/utilityFunctions';
import DataContext from '../../context/DataContext';

const Playlistcard = ({ playlist, index, changed, setChanged, isLoad }) => {
    const {token, setCurrentPlaylist, setCurrentIndex, isPlaying, setIsPlaying, clicked, setClicked} = useContext(DataContext)

    const backgroundImageUrl = `url("${playlist.image}")`;
    const navigate = useNavigate();
    
    useEffect(() => {
      if (clicked) {
        (async () => {
        const tracks = await getTracksFromPlaylist(token, clicked.id);
        if (!tracks) return;
        if (isPlaying && changed) {
            setCurrentPlaylist(tracks);
        }
        })()
      }
    }, [clicked]);
     

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
    // if (playingNow) console.log(playingNow.id);
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
            <button data-id={ playlist.id} className="play-btn" onClick={handlePlayClick}><FaPlay /></button>
            <button data-id={playlist.id} className="pause-btn hidden"  onClick={handlePauseClick}><FaPause /></button>
        </div>
    </div>
  )
}

export default Playlistcard