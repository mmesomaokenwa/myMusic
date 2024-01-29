import React from 'react'
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from "react-icons/tb";
import { FaPause, FaPlay, FaExpandAlt } from "react-icons/fa";
import './recently-played.css';
import { playSong, pauseSong } from '../../utilityFunctions/utilityFunctions';

const RecentlyPlayed = ({ playingNow, setPlayingNow, isPlaying, setIsPlaying }) => {
    const backgroundImageUrl = `url("${playingNow?.image}")`

    const handlePlayClick = () => { 
        playSong();
        setIsPlaying(true)
    }

    const handlePauseClick = () => {
        pauseSong()
        setIsPlaying(false)
    }

    // console.log(playingNow)

  return (
      <aside className='recently-played-aside'>
          <section className='recently-played-section'>
              <h2>Recently Played</h2>
              <ul className="songs"></ul>
          </section>
          <section className={playingNow ? 'mini-music-player' : 'mini-music-player hidden'}
                style={{backgroundImage: backgroundImageUrl}}
          >
              <button className="expand"><FaExpandAlt /></button>
              <div id="now-playing">
                  <div className="image">
                      <img src={playingNow?.image} alt="Now playing" />
                  </div>
                  <div className="info">
                      <p><span id="track-name">{playingNow?.name}</span> - <span id="artist-name">{ playingNow?.artist}</span></p>
                  </div>
              </div>
              <audio className='song' src={playingNow?.audio} onLoadedMetadata={handlePlayClick}></audio>
              <div className="controls">
                  <button className='previous'><TbPlayerTrackPrevFilled /></button>
                  <button id="play" className='play hidden' onClick={handlePlayClick}><FaPlay /></button>
                  <button className='pause' onClick={handlePauseClick}><FaPause /></button>
                  <button className='next'><TbPlayerTrackNextFilled /></button>
              </div>
          </section>
    </aside>
  )
}

export default RecentlyPlayed