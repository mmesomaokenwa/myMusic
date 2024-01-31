import React, { useEffect, useState } from 'react';
import { GiMusicalNotes } from "react-icons/gi";
import { IoHeadset } from "react-icons/io5";
import Playlistcard from '../../components/PlaylistCard/Playlistcard';
import Track from '../../components/TrackList/Track';
import './explore.css';
import { getData, getTracksFromPlaylist } from '../../api/fetchFunctions';

const ExplorePage = ({ featuredPlaylists, topTracks, playingNow, setPlayingNow, isPlaying, setIsPlaying, currentIndex, setCurrentIndex, currentPlaylist, setCurrentPlaylist, token, viewedPlaylist, setViewedPlaylist }) => {
  const [clicked, setClicked] = useState(false)
  
  useEffect(() => {
    setPlayingNow(currentPlaylist[currentIndex])
  }, [currentIndex, currentPlaylist])

  const handleClick = e => {
    if (e?.target?.classList.value === 'play-btn' || e?.target?.classList.value === '') { 
      const el = e?.target?.parentElement?.parentElement;
      let element;
      if (el?.className === 'play-btn') {
        element = el
      } else {
        element = el.querySelector('.play-btn')
      }
      let selectedPlaylist = featuredPlaylists.filter(playlist => playlist.id === element.dataset.id)
      selectedPlaylist = selectedPlaylist[0];
      setClicked(selectedPlaylist)
    }
  }

  const handleDocumentCLick = e => {
    if (!e.target.closest('.featured-playlist')) {
      setClicked(false);
    }
  }

  useEffect(() => {
    document.querySelector('.tracks').addEventListener('click', handleDocumentCLick)
    return () => { document.querySelector('.tracks').removeEventListener('click', handleDocumentCLick) }
  }, [])
  // console.log(clicked.id)
  // console.log(currentPlaylist)
  // console.log(playingNow)
  
  return (
      <main className='explore-page'>
      <section className='featured-playlists-section'>
        <div className="section-title">
          <GiMusicalNotes size={20} color='#ee3124'/>
          <h2>Featured Playlists</h2>
        </div>
        <div className="featured-playlist" /*onClick={handleClick}*/>
          {featuredPlaylists?.map((playlist, index) => (
            <Playlistcard
              key={playlist.id} index={index}
              playlist={playlist} isPlaying={isPlaying} setIsPlaying={setIsPlaying}
              playingNow={playingNow}
              setPlayingNow={setPlayingNow} isLoad={playlist?.id === clicked?.id ?  true : false}
              token={token} viewedPlaylist={viewedPlaylist} setViewedPlaylist={setViewedPlaylist}
              currentPlaylist={currentPlaylist} setCurrentPlaylist={setCurrentPlaylist}
              setCurrentIndex={setCurrentIndex} currentIndex={currentIndex} clicked={clicked} setClicked={setClicked}
            />
          ))}
        </div>
          </section>
      <section className="top-tracks-section">
        <div className="section-title">
          <IoHeadset size={20} color="#ee3124"/>
          <h2>Top Tracks</h2>
        </div>
        <ul className="tracks" onClick={() => setCurrentPlaylist(topTracks)}>
          {topTracks?.map((track, index) => (
            <Track key={track.id} track={track} index={index}
              playingNow={playingNow} setPlayingNow={setPlayingNow}
              isLoaded={track.id === playingNow?.id ? true : false} isPlaying={isPlaying} setIsPlaying={setIsPlaying}
              currentIndex={currentIndex} setCurrentIndex={setCurrentIndex}
            />
          ))}
          </ul>
          </section>
    </main>
  )
}

export default ExplorePage