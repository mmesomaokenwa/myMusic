import React, { useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getData, searchAlbumsByArtist, searchTracksByArtist } from '../../api/fetchFunctions';
import GoBackButton from '../../components/GoBackButton/GoBackButton';
import { PlayButton, PauseButton, ShuffleButton } from '../../components/PlayButton/PlayButton';
import { playSong, pauseSong } from '../../utilityFunctions/utilityFunctions';
import Track from '../../components/TrackList/Track';
import DataContext from '../../context/DataContext';
import PlaylistInfoSkeleton from '../../skeletons/PlaylistInfoSkeleton/PlaylistInfoSkeleton';
import AlbumCard from '../../components/AlbumCard/AlbumCard';
import './ArtistsInfoPage.css'

const ArtistsInfoPage = () => {
    const { id } = useParams();

    const playBtnSize = {fontSize: '1.7rem'}

    const { clicked, currentPlaylist, setCurrentPlaylist, setCurrentIndex, isPlaying, setIsPlaying, playingNow, token } = useContext(DataContext);

    const [viewedArtist, setViewedArtist] = useState(null)

    const [changed, setChanged] = useState(false)

    // const [albums, setAlbums] = useState([])

    // const [tracks, setTracks] = useState([])
    
    const { data: artistData, error, isLoading } = useQuery(
        ['artist', id, token],  // the key for this query
        async () => { const response = await getData(token, `/artists/${id}`); if (response) return response; throw new Error('Unable to fetch artist'); }, // the funtion for this query
        {
            refetchOnReconnect: true, // Refresh data when the connection is reestablished. Default is `true`.
            refetchOnWindowFocus:  false, // Refresh data when the window regains focus. Default is `false`
            staleTime: Infinity, // The data remains fresh indefinitely (until it gets explicitly invalidated).
            onError: (err) => console.log(`Error fetching artist info: ${err}`),
        }
    )

    useEffect(() => {
        if (artistData) {
            document.title = `${artistData?.name} | myMuic Artist Info`;
            console.log(artistData);
            const { id: Id, name, genres, images: [{ url: image }], followers: { total: followers }, popularity, type } = artistData;
            setViewedArtist({ Id, name, genres, image, followers, popularity, type })
        }
    }, [artistData])

    const { data: albumsData, error: albumsError, isLoading: albumsIsLoading } = useQuery(
        ['albums', id, token],  // the key for this query
        async () => { const response = await searchAlbumsByArtist(token, id); if (response) return response; throw new Error('Unable to fetch albums'); }, // the funtion for this query
        {
            refetchOnReconnect: true, // Refresh data when the connection is reestablished. Default is `true`.
            refetchOnWindowFocus:  false, // Refresh data when the window regains focus. Default is `false`
            staleTime: Infinity, // The data remains fresh indefinitely (until it gets explicitly invalidated).
            // onSuccess: (albumsData) => setAlbums(albumsData),
            onError: (err) => console.log(`Error fetching albums: ${err}`),
        }
    )

    const { data: tracksData, error: tracksError, isLoading: tracksIsLoading } = useQuery(
        ['tracks', id, token],  // the key for this query
        async () => { const response = await searchTracksByArtist(token, id); if (response) return response; throw new Error('Unable to fetch tracks'); }, // the funtion for this query
        {
            refetchOnReconnect: true, // Refresh data when the connection is reestablished. Default is `true`.
            refetchOnWindowFocus:  false, // Refresh data when the window regains focus. Default is `false`
            staleTime: Infinity, // The data remains fresh indefinitely (until it gets explicitly invalidated).
            // onSuccess: (tracksData) => setTracks(tracksData),
            onError: (err) => console.log(`Error fetching tracks: ${err}`),
        }
    )

    useEffect(() => {
    if (isPlaying) {
      document.querySelector('.artist-play-btn')?.classList?.add('hidden')
      document.querySelector('.artist-pause-btn')?.classList?.remove('hidden')
    } else {
      document.querySelector('.artist-pause-btn')?.classList?.add('hidden')
      document.querySelector('.artist-play-btn')?.classList?.remove('hidden')
    }
  }, [isPlaying])

  const handlePlayClick = () => {
    if (currentPlaylist !== tracksData) {
      setCurrentPlaylist(tracksData);
      setCurrentIndex(0);
    }
    setIsPlaying(true)
    playSong()
   }
  
  const handlePauseClick = () => {
    setIsPlaying(false);
    pauseSong();
  }
  
  const handleShuffleClick = () => {
    let shuffledTracks = tracksData?.slice().sort(() => Math.random() - 0.5);
    setCurrentPlaylist(shuffledTracks)
    setCurrentIndex(0);
    setIsPlaying(true)
  }

    const toggleLoadMore = () => {
        document.querySelector('.artist-songs-list').classList.toggle('load-more')
        if (document.querySelector('.artist-songs-list').classList.contains('load-more')) {
            document.querySelector('.load-more-btn').textContent = 'Load Less'
        } else {
            document.querySelector('.load-more-btn').textContent = 'Load More'
        }
    }

    const genre = viewedArtist?.genres?.map((genre) => genre).join(', ') || '';

    if (isLoading || albumsIsLoading || tracksIsLoading) {
      return <PlaylistInfoSkeleton />
    }
    
    if (error || albumsError || tracksError) {
      return <div>Error: {error.message}</div>
    }
    
  return (
      <main className='artist-info-page' >
          <section className='artist-info' style={{ backgroundImage: `url(${viewedArtist?.image})` }}>
              <h1>{viewedArtist?.name}</h1>
              <p>{ viewedArtist?.type === 'artist' ? 'Artist' : 'Group' }</p>
              <p>{(viewedArtist?.followers)?.toLocaleString()} followers</p>
              <p>Popularity: {viewedArtist?.popularity}/100</p>
              <p>Genres: {genre}</p>
              <GoBackButton />
          </section>
          <section className="artist-controls">
              <PlayButton className="artist-play-btn" onClick={handlePlayClick} style={playBtnSize}/>
              <PauseButton className="artist-pause-btn hidden" onClick={handlePauseClick} style={playBtnSize}/>
              <ShuffleButton className="artist-shuffle-btn" onClick={handleShuffleClick}/>
          </section>
          <section className='artist-songs'>
              <h2>Popular</h2>
              <ul className='artist-songs-list' onClick={() => setCurrentPlaylist(tracksData)}>
                  {tracksData?.map((track, index) => (
                      <Track key={track?.id} track={track} index={index} isLoaded={track?.id === playingNow?.id}/>
                  ))}
              </ul>
              <button className='load-more-btn' onClick={toggleLoadMore}>Load More</button>
          </section>
          <section className='artist-albums'>
              <h2>Albums</h2>
              <ul className='artist-albums-list' onClick={() => setCurrentPlaylist(albumsData)}>
                  {albumsData?.map((album, index) => (
                      <AlbumCard key={album?.id} album={album} index={index} isLoaded={album?.id === clicked?.id} changed={changed} setChanged={setChanged}/>
                  ))}
              </ul>
          </section>
      </main>
  )
}

export default ArtistsInfoPage