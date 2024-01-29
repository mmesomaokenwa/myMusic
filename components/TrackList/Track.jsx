import React, { useEffect } from 'react';
import { GiSoundWaves } from "react-icons/gi";
import { FaPlay, FaPause } from 'react-icons/fa';
import './Track.css';
import { playSong, pauseSong } from '../../utilityFunctions/utilityFunctions';

const Track = ({ track, index, playingNow, setPlayingNow, isLoaded, isPlaying, setIsPlaying }) => {
  const formatToTime = (seconds) => {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = Math.floor(seconds % 60);
    return `${minutes < 10 ? `0${minutes}` : minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
  }

  const handlePlayClick = (index) => {
    playSong();
    document.querySelectorAll('.track-play-btn')[index].classList.add('hidden');
    document.querySelectorAll('.track-pause-btn')[index].classList.remove('hidden');
  }

  const handlePauseClick = (index) => {
    pauseSong();
    document.querySelectorAll('.track-play-btn')[index].classList.remove('hidden');
    document.querySelectorAll('.track-pause-btn')[index].classList.add('hidden')
  };

  const handleTrackClick = (track, index) => {
    setIsPlaying(true);
    setPlayingNow(track)
    // if (!isLoaded) {
    //   setPlayingNow(track);
    // } 
    // else {
    //   setPlayingNow(null);
    //   setTimeout(() => setPlayingNow(track), 1)
    // }
  }

  useEffect(() => {
    // If the song is currently playing and it's not this one, hide the play button for that one too
    if (!isLoaded) {
      document.querySelectorAll('.track-play-btn')[index].classList.remove('hidden');
      document.querySelectorAll('.track-pause-btn')[index].classList.add('hidden')
    } else {
      document.querySelectorAll('.track-play-btn')[index].classList.add('hidden');
      document.querySelectorAll('.track-pause-btn')[index].classList.remove('hidden')
    }
  }, [isLoaded])

  useEffect(() => {
    if (isLoaded && isPlaying) {
      document.querySelectorAll('.track-play-btn')[index].classList.add('hidden');
      document.querySelectorAll('.track-pause-btn')[index].classList.remove('hidden')
    } else {
      document.querySelectorAll('.track-play-btn')[index].classList.remove('hidden');
      document.querySelectorAll('.track-pause-btn')[index].classList.add('hidden')
    }
  }, [isPlaying])

  return (
    <li className='track-item' onClick={() => handleTrackClick(track, index)}>
      <div className='track-info'>
        <p className="track-number">{track.number < 10 ? `0${track.number}` : track.number}</p>
        <img src={track.image} alt="track image" className="track-img" />
        <p className="artist-and-title">
          <span className="artist">{track.artist}</span> -  <span className="title">{track.name}</span>
        </p>
      </div>
      <p className="duration">{formatToTime(track.length)}</p>
      <GiSoundWaves size={32} color="" />
      <div className="play-and-pause">
        <button onClick={() => handlePlayClick(index)} className='track-play-btn'><FaPlay /></button>
        <button onClick={() => handlePauseClick(index)} className='track-pause-btn hidden'><FaPause /></button>
      </div>
    </li>
  )
}

export default Track