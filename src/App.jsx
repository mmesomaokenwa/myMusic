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
import LoginPage from '../screens/LoginPage/LoginPage';
import ResetPasswordPage from '../screens/ResetPasswordPage/ResetPasswordPage';
import SignUpPage from '../screens/SignUpPage/SignUpPage';
import UserProfilePage from '../screens/UserProfilePage/UserProfilePage';
import ProtectedRoute from '../components/ProtectedRoute/ProtectedRoute';
import './App.css'
import EditAccountPage from '../screens/EditAccountPage/EditAccountPage';
import Settingspage from '../screens/SettingsPage/Settingspage';


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
          <Route path='/login' element={<LoginPage />} />
          <Route path='/reset-password' element={<ResetPasswordPage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/profile/:username' element={<ProtectedRoute><UserProfilePage /></ProtectedRoute>} />
          <Route path='/edit-account' element={<ProtectedRoute><EditAccountPage /></ProtectedRoute>} />
          <Route path='/settings' element={<ProtectedRoute><Settingspage /></ProtectedRoute>} />
          <Route path="/*" element={<RecentlyPlayed />} status={404} />
        </Routes>
        <RecentlyPlayed />
        </div>
    </>
  )
}

export default App
