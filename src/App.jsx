import { useState, useEffect } from 'react'
import Header from '../components/Header/Header'
import Nav from '../components/Nav/Nav'
import RecentlyPlayed from '../components/RecentlyPlayed/RecentlyPlayed';
import ExplorePage from '../screens/ExplorePage/ExplorePage';
import { clientID, clientSecret } from '../api/client';
import './App.css'
import { getAccessToken, getData } from '../api/fetchFunctions';


function App() {
  const [token, setToken] = useState(null);
  const [featuredPlaylists, setFeaturedPlaylists] = useState(JSON.parse(localStorage.getItem('featuredPlaylists')));
  const [topTracks, setTopTracks] = useState(JSON.parse(localStorage.getItem('topTracks')));
  const [playingNow, setPlayingNow] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

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
        let tracks = await  getData(token, `/playlists/${id}/tracks`);
        if(!tracks) return;
        tracks = tracks.items
        // console.log(tracks)
        const newTracks = tracks.map((track , index)=> {
          return {
            number: index + 1,
            id:  track.track.id,
            name: track.track.name,
            artist: track.track.artists[0].name,
            image: track.track.album.images[1] ? track.track.album.images[1].url : track.track.album.images[0].url,
            audio: track.track.preview_url,
            length:  track.track.duration_ms / 1000
          }
        })
        setTopTracks(newTracks);
        // console.log(newTracks)
        localStorage.setItem("topTracks",JSON.stringify(newTracks))
      })()
    }
  }, [featuredPlaylists])

  

  return (
    <>
      <Header />
      <div className='full-page'>
        <Nav />
        <RecentlyPlayed playingNow={playingNow} setPlayingNow={setPlayingNow}
            isPlaying={isPlaying} setIsPlaying={setIsPlaying}
        />
        <ExplorePage featuredPlaylists={featuredPlaylists} topTracks={topTracks}
          playingNow={playingNow} setPlayingNow={setPlayingNow}
          isPlaying={isPlaying} setIsPlaying={setIsPlaying}
        />
      </div>
    </>
  )
}

export default App
