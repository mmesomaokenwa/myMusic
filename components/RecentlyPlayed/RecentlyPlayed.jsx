import React, { useContext } from 'react'
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from "react-icons/tb";
import { FaExpandAlt } from "react-icons/fa";
import { PlayButton, PauseButton } from '../PlayButton/PlayButton';
import './recently-played.css';
import { playSong, pauseSong } from '../../utilityFunctions/utilityFunctions';
import DataContext from '../../context/DataContext';

const RecentlyPlayed = () => {
    const { playingNow, setIsPlaying, currentIndex, setCurrentIndex, currentPlaylist} = useContext(DataContext)

    const backgroundImageUrl = `url("${playingNow?.image}")`

    const playBtnSize = {fontSize : '1.5rem'}

    const handlePlayClick = () => { 
        playSong();
        setIsPlaying(true)
    }

    const handlePauseClick = () => {
        pauseSong()
        setIsPlaying(false)
    }

    const playNextSong = (currentIndex) => {
        if (currentIndex ===  currentPlaylist.length -1){
            setCurrentIndex(0)
        } else{
           setCurrentIndex(prev =>  prev + 1)  
        }
    }
    
    const  playPreviousSong = (currentIndex) => {
        if (currentIndex=== 0 ){
            setCurrentIndex(currentPlaylist.length -1 )
        }else{
            setCurrentIndex(prev=>  prev - 1)
        }
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
              <audio className='song' src={playingNow?.audio} onLoadedMetadata={handlePlayClick} onEnded={() => playNextSong(currentIndex)}></audio>
              <div className="controls">
                  <button className='previous' onClick={e => playPreviousSong(currentIndex)}><TbPlayerTrackPrevFilled /></button>
                  <PlayButton className='play' onClick={handlePlayClick} style={playBtnSize}/>
                  <PauseButton className='pause hidden' onClick={handlePauseClick} style={playBtnSize}/>
                  <button className='next' onClick={e => playNextSong(currentIndex)}><TbPlayerTrackNextFilled /></button>
              </div>
          </section>
    </aside>
  )
}

export default RecentlyPlayed