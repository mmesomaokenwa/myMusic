import { useState, useEffect } from 'react'
import { Route, Routes, Link } from 'react-router-dom';
import Header from '../components/Header/Header'
import Nav from '../components/Nav/Nav'
import RecentlyPlayed from '../components/RecentlyPlayed/RecentlyPlayed';
import ExplorePage from '../screens/ExplorePage/ExplorePage';
import SongsPage from '../screens/SongsPage/SongsPage';
import PlaylistInfoPage from '../screens/PlaylistInfoPage/PlaylistInfoPage';
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
          <Route path='/songs' element={<SongsPage /*songs={songs}*//>} />
        </Routes>
        <RecentlyPlayed />
        </div>
    </>
  )
}

export default App
