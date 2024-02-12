import React from 'react'
import AlbumCard from '../AlbumCard/AlbumCard'
import './Albums.css'

const Albums = ({ albums }) => {
  console.log(albums)
  return (
      <ul className='albums-list'>
      {albums?.map((album) => (
        <AlbumCard key={album.id} album={album} />
      ))}
    </ul>
  )
}

export default Albums