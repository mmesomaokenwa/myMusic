import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { GiMusicalNotes } from "react-icons/gi";
import { IoHeadset } from "react-icons/io5";
import Playlistcard from '../../components/PlaylistCard/Playlistcard';
import Track from '../../components/TrackList/Track';
import './explore.css';
import { getData, getTracksFromPlaylist } from '../../api/fetchFunctions';
import DataContext from '../../context/DataContext';

const ExplorePage = () => {
  const { featuredPlaylists, topTracks, playingNow, setCurrentPlaylist, clicked, setClicked } = useContext(DataContext)

  const [changed, setChanged] = useState(false)

  const handleDocumentCLick = e => {
    if (!e.target.closest('.featured-playlist')) {
      setClicked(false);
    }
  }

  useEffect(() => {
    document.querySelector('.tracks').addEventListener('click', handleDocumentCLick)
    return () => { document.querySelector('.tracks')?.removeEventListener('click', handleDocumentCLick) }
  }, [])
  // console.log(clicked.id)
  // console.log(currentPlaylist)
  // console.log(playingNow)
  // console.log(changed)
  
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
              playlist={playlist} isLoad={playlist?.id === clicked?.id ?  true : false}
               changed={changed} setChanged={setChanged}
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
              isLoaded={track.id === playingNow?.id ? true : false}
            />
          ))}
          </ul>
          </section>
    </main>
  )
}

export default ExplorePage