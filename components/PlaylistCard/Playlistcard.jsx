import React, { useEffect, useMemo, useState } from 'react';
import { FaPause, FaPlay } from "react-icons/fa";
import { getData, getTracksFromPlaylist } from '../../api/fetchFunctions';
import './PlaylistCard.css';
import { playSong, pauseSong } from '../../utilityFunctions/utilityFunctions';

const Playlistcard = ({ playlist, index, playingNow, setPlayingNow, token, viewedPlaylist, setViewedPlaylist, currentPlaylist, setCurrentPlaylist, currentIndex, setCurrentIndex, isPlaying, setIsPlaying, isLoad, clicked, setClicked }) => {
    const backgroundImageUrl = `url("${playlist.image}")`;
    
    useEffect(() => {
      if (clicked) {
        (async () => {
        const tracks = await getTracksFromPlaylist(token, clicked.id);
        if (!tracks) return;
        setViewedPlaylist(tracks);
        if (isPlaying) {
            setCurrentPlaylist(tracks);
        }
        })()
      }
    }, [clicked]);
     

    useEffect(() => {
        if (isLoad && isPlaying) {
            document.querySelectorAll('.play-btn')[index]?.classList.add('hidden');
            document.querySelectorAll('.pause-btn')[index]?.classList.remove('hidden');
        } else {
            document.querySelectorAll('.play-btn')[index]?.classList.remove('hidden');
            document.querySelectorAll('.pause-btn')[index]?.classList.add('hidden');
        }
    }, [isPlaying, isLoad])
    
    const handlePlayClick = index => {
        if (!isLoad) {
            setIsPlaying(true)
            setCurrentPlaylist(viewedPlaylist)
            setCurrentIndex(0);
            playSong()
        }
        else {
            setIsPlaying(true);
            playSong()
        }
    }

    const handlePauseClick = index => {
        setIsPlaying(false);
        pauseSong()
    };
    // if (playingNow) console.log(playingNow.id);
    // console.log(viewedPlaylist)
  return (
      <div key={playlist.id}
          className='playlist-card'
          style={{ background: backgroundImageUrl }}
          onClick={() => setClicked(playlist)}
      >
          <div className="playlist-info">
              <div>
                  <p className="playlist-name">{playlist.name}</p>
                  <p className="track-length">50 Songs</p>
              </div>
              <button data-id={ playlist.id} className="play-btn" onClick={() => handlePlayClick(index)}><FaPlay /></button>
              <button data-id={playlist.id} className="pause-btn hidden"  onClick={() =>handlePauseClick(index)}><FaPause /></button>
          </div>
    </div>
  )
}

export default Playlistcard