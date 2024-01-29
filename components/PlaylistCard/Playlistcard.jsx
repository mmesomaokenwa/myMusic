import React from 'react';
import { FaPause, FaPlay } from "react-icons/fa";
import './PlaylistCard.css';

const Playlistcard = ({ playlist }) => {
    const backgroundImageUrl = `url("${playlist.image}")`
  return (
      <div key={playlist.id}
          className='playlist-card'
          style={{background: backgroundImageUrl}}
      >
          <div className="playlist-info">
              <div>
                  <p className="playlist-name">{playlist.name}</p>
                  <p className="track-length">50 Songs</p>
              </div>
              <button className="play-btn"><FaPlay /></button>
              <button className="pause-btn hidden"><FaPause /></button>
          </div>
    </div>
  )
}

export default Playlistcard