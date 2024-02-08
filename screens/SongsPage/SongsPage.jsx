import React, { useContext, useEffect } from 'react'
import { getData, getTracksFromPlaylist } from '../../api/fetchFunctions'
import './SongsPage.css'
import DataContext from '../../context/DataContext'
import { useQuery } from 'react-query'
import genres from '../../data/genres'

const SongsPage = () => {
  const { token } = useContext(DataContext);

  // const { data: genres, error, isLoading } = useQuery(
  //   ['genres', token],
  //   async () => { const response = await getData(token, '/recommendations/available-genre-seeds'); if (response) return response; throw new Error('Failed to fetch genres') },
  //   {
  //     onSuccess: (response) => { console.log(response) },
  //     onError:  (error) => console.log('An error occurred in fetching the genres: ', error),
  //   }
  // )

  return (
      <main>
          SongsPage
    </main>
  )
}

export default SongsPage