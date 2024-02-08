import React from 'react'
import './Artists.css'
import ArtistsCard from '../ArtistsCard/ArtistsCard'

const Artists = ({artists}) => {
  return (
      <ul className='artists-list'>
      {artists.map((artist) => (
        <ArtistsCard key={artist.id} artist={artist} />
      ))}
    </ul>
  )
}

export default Artists