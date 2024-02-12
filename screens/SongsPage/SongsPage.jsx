import React, { useContext, useEffect } from 'react'
import { getData, getTracksFromPlaylist } from '../../api/fetchFunctions'
import './SongsPage.css'
import DataContext from '../../context/DataContext'
import { useQuery } from 'react-query'
import genres from '../../data/genres'
import UserAuthContext from '../../context/userAuthContext'
import UserAuth from '../UserAuth/UserAuth'

const SongsPage = () => {
  const { user } = useContext(UserAuthContext)
  
  if (!user) return <UserAuth />

  return (
      <main>
          SongsPage
    </main>
  )
}

export default SongsPage