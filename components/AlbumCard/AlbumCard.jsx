import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { PlayButton, PauseButton } from '../PlayButton/PlayButton'
import { searchTracksByAlbum } from '../../api/fetchFunctions'
import { useQuery } from 'react-query'
import { playSong, pauseSong } from '../../utilityFunctions/utilityFunctions'
import DataContext from '../../context/DataContext'
import './AlbumCard.css'

const AlbumCard = ({ album, index, changed, setChanged, isLoaded }) => {
    const backgroundImageStyle = {
        backgroundImage: `url(${album?.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    }

    const {token, setCurrentPlaylist, setCurrentIndex, isPlaying, setIsPlaying, clicked, setClicked} = useContext(DataContext)

    const navigate = useNavigate();

    const { data: tracks, error, isLoading } = useQuery(
        ['tracks', clicked],
        async () => { const response = await searchTracksByAlbum(token, clicked?.id); if (response) return response; throw new Error('Failed to fetch tracks') },
        {
            enabled: clicked && clicked.id === album.id,
            onSuccess: (tracks) => { 
                tracks?.map(track => track.image = album.image);
                if (isPlaying && changed) setCurrentPlaylist(tracks)
            },
            onError: (err) => console.log(err),
            refetchOnWindowFocus: false,
            staleTime: Infinity // Keep the data fresh forever until it's no longer needed
        }
    )
     
    useEffect(() => {
        console.log(tracks)
    }, [tracks])

    useEffect(() => {
        if (isLoaded && isPlaying && changed) {
            document.querySelectorAll('.card-play-btn')[index]?.classList.add('hidden');
            document.querySelectorAll('.card-pause-btn')[index]?.classList.remove('hidden');
        } else if (!isLoaded && !isPlaying && changed) {
            document.querySelectorAll('.card-play-btn')[index]?.classList.remove('hidden');
            document.querySelectorAll('.card-pause-btn')[index]?.classList.add('hidden');
        } else if (isLoaded && !isPlaying && changed) {
            document.querySelectorAll('.card-play-btn')[index]?.classList.remove('hidden');
            document.querySelectorAll('.card-pause-btn')[index]?.classList.add('hidden');
        } else if (!isLoaded && !changed && !isPlaying) {
            document.querySelectorAll('.card-play-btn')[index]?.classList.remove('hidden');
            document.querySelectorAll('.card-pause-btn')[index]?.classList.add('hidden');
        } else {
            document.querySelectorAll('.card-play-btn')[index]?.classList.remove('hidden');
            document.querySelectorAll('.card-pause-btn')[index]?.classList.add('hidden');
        }
    }, [isPlaying, isLoaded])

    const handleAlbumClick = (e) => {
        e.preventDefault()
        navigate(`/albums/${album.id}`)
        setChanged(false)
        setClicked(album)
    }
    
    const handlePlayClick = e => {
        e.stopPropagation()
        setClicked(album)
        setChanged(true)
        if (!isLoaded) {
            setIsPlaying(true)
            setCurrentIndex(0);
            playSong()
        }
        else {
            setIsPlaying(true);
            playSong()
        }
    }

    const handlePauseClick = e => {
        e.stopPropagation()
        setIsPlaying(false);
        pauseSong()
    };
  return (
      <li className='album-card' style={backgroundImageStyle} onClick={handleAlbumClick}>
          <div>
            <div className="album-card-info">
              <p className='album-name'>{album?.name}</p>
              <p className='album-release-date'><span>{album?.releaseDate ? album?.releaseDate?.split('-')[0] : ''}</span> • {album?.albumType === 'album' ? 'Album' : 'Single'} </p>
              </div>
              <PlayButton className='card-play-btn' onClick={handlePlayClick}/>
              <PauseButton className='card-pause-btn hidden' onClick={handlePauseClick}/>
          </div>
    </li>
  )
}

export default AlbumCard