import { useState, useEffect } from 'react'
import Header from '../components/Header/Header'
import Nav from '../components/Nav/Nav'
import RecentlyPlayed from '../components/RecentlyPlayed/RecentlyPlayed';
import ExplorePage from '../screens/ExplorePage/ExplorePage';
import { clientID, clientSecret } from '../api/client';
import './App.css'
import { getAccessToken, getData, getTracksFromPlaylist } from '../api/fetchFunctions';


function App() {
  const [token, setToken] = useState(null);
  const [featuredPlaylists, setFeaturedPlaylists] = useState(JSON.parse(localStorage.getItem('featuredPlaylists')));
  const [topTracks, setTopTracks] = useState(JSON.parse(localStorage.getItem('topTracks')));
  const [playingNow, setPlayingNow] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPlaylist, setCurrentPlaylist] = useState([]);
  const [viewedPlaylist,  setViewedPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);

  useEffect(() => {
    (async () => {
      let accessToken = await getAccessToken('https://accounts.spotify.com/api/token', clientID, clientSecret);
      if (!accessToken) return;
      setToken(accessToken);
    })()
  }, [])
    
    
  useEffect(() => {
    if (token) {
        (async () => {
          let featured = await getData(token, '/browse/featured-playlists?country=US');
          if (!featured) return;
          const newFeatured = featured.playlists.items.map(featuredObject => {
            return {
              name: featuredObject.name,
              id: featuredObject.id,
              image: featuredObject.images[0].url,
              description: featuredObject.description
            }
          })
          setFeaturedPlaylists(newFeatured);
          localStorage.setItem('featuredPlaylists', JSON.stringify(featuredPlaylists))
      })()
    }
  }, [token])

  useEffect(() => {
    if (featuredPlaylists && token) {
      (async () => {
        const id = featuredPlaylists[0].id;
        const tracks = await getTracksFromPlaylist(token, id);
        setTopTracks(tracks);
        // console.log(newTracks)
        localStorage.setItem("topTracks",JSON.stringify(tracks))
      })()
    }
  }, [featuredPlaylists])

  

  return (
    <>
      <Header />
      <div className='full-page'>
        <Nav />
        <RecentlyPlayed playingNow={playingNow} setPlayingNow={setPlayingNow}
          isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex} currentPlaylist={currentPlaylist} setCurrentPlaylist={setCurrentPlaylist}
        />
        <ExplorePage featuredPlaylists={featuredPlaylists} topTracks={topTracks}
          playingNow={playingNow} setPlayingNow={setPlayingNow}
          isPlaying={isPlaying} setIsPlaying={setIsPlaying}
          currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} currentPlaylist={currentPlaylist}
          setCurrentPlaylist={setCurrentPlaylist} token={token} viewedPlaylist={viewedPlaylist} 
          setViewedPlaylist={setViewedPlaylist}
        />
      </div>
    </>
  )
}

export default App
