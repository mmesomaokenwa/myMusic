import { useState, useEffect } from 'react'
import { Route, Routes, Link } from 'react-router-dom';
import Header from '../components/Header/Header'
import Nav from '../components/Nav/Nav'
import RecentlyPlayed from '../components/RecentlyPlayed/RecentlyPlayed';
import ExplorePage from '../screens/ExplorePage/ExplorePage';
import SongsPage from '../screens/SongsPage/SongsPage';
import ArtistsPage from '../screens/ArtistsPage/ArtistsPage';
import AlbumsPage from '../screens/AlbumsPage/AlbumsPage';
import PlaylistInfoPage from '../screens/PlaylistInfoPage/PlaylistInfoPage';
import ArtistsInfoPage from '../screens/ArtistsInfoPage/ArtistsInfoPage';
import AlbumInfoPage from '../screens/AlbumInfoPage/AlbumInfoPage';
import './App.css'


function App() {

  return (
    <>
      <Header />
      <div className='full-page'>
        <Nav />
        <Routes>
          <Route path='/' element={<ExplorePage />} />
          <Route path='/playlist/:id' element={<PlaylistInfoPage />} />
          <Route path='/songs' element={<SongsPage />} />
          <Route path='/artists' element={<ArtistsPage />} />
          <Route path='/artists/:id' element={<ArtistsInfoPage />} />
          <Route path='/albums' element={<AlbumsPage />} />
          <Route path='/albums/:id' element={<AlbumInfoPage />} />
        </Routes>
        <RecentlyPlayed />
        </div>
    </>
  )
}

export default App
