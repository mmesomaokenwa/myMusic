import { createContext, useEffect, useState } from "react";
import { clientID, clientSecret, clientID2, clientSecret2 } from '../api/client';
import { getAccessToken, getData, getTracksFromPlaylist } from '../api/fetchFunctions';

const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [token, setToken] = useState(JSON.parse(localStorage.getItem('token')));
    const [featuredPlaylists, setFeaturedPlaylists] = useState(JSON.parse(localStorage.getItem('featuredPlaylists')));
    const [topTracks, setTopTracks] = useState([]);
    const [playingNow, setPlayingNow] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentPlaylist, setCurrentPlaylist] = useState([]);
    const [viewedPlaylist,  setViewedPlaylist] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [clicked, setClicked] = useState(false)

    useEffect(() => {
        (async () => {
        let accessToken = await getAccessToken('https://accounts.spotify.com/api/token', clientID2, clientSecret2);
        if (!accessToken) return;
        setToken(accessToken);
        localStorage.setItem('token', JSON.stringify(accessToken));
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
                description: featuredObject.description,
                length:  featuredObject.tracks.total
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
            if (!tracks) return;
            setTopTracks(tracks);
            localStorage.setItem("topTracks",JSON.stringify(tracks))
        })()
        }
    }, [featuredPlaylists])

    useEffect(() => {
        setPlayingNow(currentPlaylist[currentIndex])
    }, [currentIndex, currentPlaylist])

    return (
        <DataContext.Provider value={{
            token, setToken, featuredPlaylists, setFeaturedPlaylists, topTracks, setTopTracks, playingNow, setPlayingNow, isPlaying, setIsPlaying, currentPlaylist, setCurrentPlaylist, viewedPlaylist,  setViewedPlaylist, currentIndex, setCurrentIndex, clicked, setClicked
        }}>
            {children}
        </DataContext.Provider>
    )
 }

 export default DataContext