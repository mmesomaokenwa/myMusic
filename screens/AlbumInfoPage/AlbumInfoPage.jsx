import React from 'react'
import { useParams } from 'react-router-dom'
import './AlbumInfoPage.css'

const AlbumInfoPage = () => {
    const {id} = useParams();

  return (
    <main>AlbumInfoPage { id }</main>
  )
}

export default AlbumInfoPage