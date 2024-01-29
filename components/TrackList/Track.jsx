import React from 'react';
import { GiSoundWaves } from "react-icons/gi";
import { FaPlay, FaPause } from 'react-icons/fa';
import './Track.css'

const Track = ({ track, playingNow, setPlayingNow }) => {
  const formatToTime = (seconds) => {
    let minutes = Math.floor(seconds / 60);
    let remainingSeconds = Math.floor(seconds % 60);
    return `${minutes < 10 ? `0${minutes}` : minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
  }
  return (
    <li className='track-item' onClick={() => setPlayingNow(track)}>
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
        <button className='track-play-btn'><FaPlay /></button>
        <button className='track-pause-btn hidden'><FaPause /></button>
      </div>
    </li>
  )
}

export default Track