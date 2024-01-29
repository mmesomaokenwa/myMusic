import React from 'react';
import { GiMusicalNotes } from "react-icons/gi";
import { IoHeadset } from "react-icons/io5";
import Playlistcard from '../../components/PlaylistCard/Playlistcard';
import Track from '../../components/TrackList/Track';
import './explore.css'

const ExplorePage = ({ featuredPlaylists, topTracks, playingNow, setPlayingNow, isPlaying, setIsPlaying }) => {
  
  return (
      <main className='explore-page'>
      <section className='featured-playlists-section'>
        <div className="section-title">
          <GiMusicalNotes size={20} color='#ee3124'/>
          <h2>Featured Playlists</h2>
        </div>
        <div className="featured-playlist">
          {featuredPlaylists?.map(playlist => (
            <Playlistcard
              key={playlist.id}
              playlist={playlist}
              playingNow={playingNow}
              setPlayingNow={setPlayingNow}
            />
          ))}
        </div>
          </section>
      <section className="top-tracks-section">
        <div className="section-title">
          <IoHeadset size={20} color="#ee3124"/>
          <h2>Top Tracks</h2>
        </div>
        <ul className="tracks">
          {topTracks?.map((track, index) => (
            <Track key={track.id} track={track} index={index}
              playingNow={playingNow} setPlayingNow={setPlayingNow}
              isLoaded={track === playingNow ? true : false} isPlaying={isPlaying} setIsPlaying={setIsPlaying}
            />
          ))}
          </ul>
          </section>
    </main>
  )
}

export default ExplorePage