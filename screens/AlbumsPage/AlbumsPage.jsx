import React, { useMemo, useContext } from 'react'
import { useQuery } from 'react-query'
import DataContext from '../../context/DataContext'
import genres from '../../data/genres'
import { searchAlbumsByGenre } from '../../api/fetchFunctions'
import Albums from '../../components/AlbumsList/Albums'
import ArtistsPageSkeleton from '../../skeletons/ArtistsPageSkeleton/ArtistsPageSkeleton'
import './AlbumsPage.css'

const AlbumsPage = () => {
    const { token } = useContext(DataContext)
    
    const newRealeaseIndex = useMemo(() => genres.findIndex(g => g === 'new-release'), [genres]);
    const acousticIndex = useMemo(() => genres.findIndex(g => g === "acoustic"), [genres]);
    const afrobeatIndex = useMemo(() =>  genres.findIndex(g => g === "afrobeat"), [genres]);
    const britishIndex = useMemo(() => genres.findIndex(g => g === "british"), [genres]);
    const chillIndex = useMemo(() => genres.findIndex(g => g === 'chill'), [genres]);
    const hiphopIndex = useMemo(() => genres.findIndex(g => g === "hip-hop"), [genres]);
    const popIndex = useMemo(() => genres.findIndex(g => g === "pop"), [genres]);
    const countryIndex = useMemo(() => genres.findIndex(g => g === "country"), [genres]);
    const jazzIndex = useMemo(() => genres.findIndex(g => g === "jazz"), [genres]);
    const frenchIndex = useMemo(() => genres.findIndex(g => g === "french"), [genres]);
    const classicalIndex = useMemo(() => genres.findIndex(g => g === 'classical'), [genres]);
    const romanceIndex = useMemo(() => genres.findIndex(g => g === 'romance'), [genres]);
    const reggaeIndex = useMemo(() => genres.findIndex(g => g === 'reggae'), [genres]);
    const gospelIndex = useMemo(() => genres.findIndex(g => g === 'gospel'), [genres]);
    const rockIndex = useMemo(() => genres.findIndex(g => g === "rock"), [genres]);

    const { data: newRealeaseAlbums, error: newRealeaseError, isLoading: LoadingNewRealease } = useQuery(
        ['newRealease', token, genres],
        () => searchAlbumsByGenre(token, genres[newRealeaseIndex]),
        {
            enabled: !!token && newRealeaseIndex !== -1,
            staleTime: Infinity,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
        }
    )

    const { data: acousticAlbums, error: acousticError, isLoading: LoadingAcoustic } = useQuery(
        ['acousticAlbums', token, genres],
        async () => { const response =  searchAlbumsByGenre(token, genres[acousticIndex]) },
        {
            enabled: !!token && acousticIndex !== -1,
            staleTime: Infinity,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
        }
    )
    
    const { data: afrobeatAlbums, error: afrobeatError, isLoading: LoadingAfro } = useQuery(
        ['afrobeatAlbums', token, genres],
        async () => { const response = await searchAlbumsByGenre(token, genres[afrobeatIndex]); if (response) return response; throw new Error('afrobeat fetch error')},
        {
            enabled: !!token && afrobeatIndex !== -1,
            staleTime: Infinity,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,         
        }
    )
    
    const { data: britishAlbums, error: britishError, isLoading: LoadingEnglish } = useQuery(
        ['britishAlbums', token, genres],
        () => searchAlbumsByGenre(token, genres[britishIndex]),
        {
            enabled: !!token && britishIndex !== -1,
            staleTime: Infinity,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,   
        }
    )
    
    const { data: hiphopAlbums, error: hipHopError, isLoading: loadingHipHop } = useQuery(
        ["hiphopAlbums", token, genres],
        () => searchAlbumsByGenre(token, genres[hiphopIndex]),
        {
            enabled: !!token && hiphopIndex !==  -1,
            staleTime: Infinity,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,    
        }
    )
    
    const { data: countryAlbums, error: countryError, isLoading: loadingCountry } = useQuery(
        ['countryAlbums', token, genres],
        () => searchAlbumsByGenre(token, genres[countryIndex]),
        {
            enabled:  !!token && countryIndex !== -1,
            staleTime: Infinity,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,    
        }
    )
    
    const { data: jazzAlbums, error: jazzError, isLoading: loadingJazz } = useQuery(
        ['jazzAlbums', token, genres],
        () => searchAlbumsByGenre(token, genres[jazzIndex]),
        {
            enabled:  !!token && jazzIndex !== -1,
            staleTime: Infinity,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,    
        }
    )
    
    const { data: romanceAlbums, error: romanceError, isLoading: loadingRomance } = useQuery(
        ['romanceAlbums', token, genres],
        () => searchAlbumsByGenre(token, genres[romanceIndex]),
        {
            enabled: !!token  && romanceIndex !== -1,
            staleTime: Infinity,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,    
        }
    )
    
    const { data: popAlbums, error: popError, isLoading: loadingPop } = useQuery(
        ['popAlbums', token, genres],
        () => searchAlbumsByGenre(token, genres[popIndex]),
        {
            enabled: !!token  && popIndex !== -1,
            staleTime: Infinity,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            
        }
    )
    
    const { data: chillAlbums, error: chillError, isLoading: loadingChill } = useQuery(
        ['chillAlbums', token, genres],
        () => searchAlbumsByGenre(token, genres[chillIndex]),
        {
            enabled: !!token  && chillIndex !== -1,
            staleTime: Infinity,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,    
        }
    )
    
    const { data: frenchAlbums, error: frenchError, isLoading: loadingFrench } = useQuery(
        ['frenchAlbums', token, genres],
        () => searchAlbumsByGenre(token, genres[frenchIndex]),
        {
            enabled: !!token  && frenchIndex !== -1,
            staleTime: Infinity,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,    
        }
    )
    
    const { data: classicalAlbums, error: classicalError, isLoading: loadingClassical } = useQuery(
        ['classicalAlbums', token, genres],
        () => searchAlbumsByGenre(token, genres[classicalIndex]),
        {
            enabled: !!token &&  classicalIndex !== -1,
            staleTime: Infinity,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,   
        }
    )
    
    const { data: reggaeAlbums, error: reggaeError, isLoading: loadingReggae } = useQuery(
        ['reggaeAlbums', token, genres],
        () => searchAlbumsByGenre(token, genres[reggaeIndex]),
        {
            enabled: !!token  && reggaeIndex !== -1,
            staleTime: Infinity,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,    
        }
    )
    
    const { data: gospelAlbums, error: gospelError, isLoading: loadingGospel } = useQuery(
        ['gospelAlbums', token, genres],
        () => searchAlbumsByGenre(token, genres[gospelIndex]),
        {
            enabled:  !!token && gospelIndex !== -1,
            staleTime: Infinity,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,    
        }
    )
    
    const { data: rockAlbums, error: rockError, isLoading: loadingRock } = useQuery(
        ['rockAlbums', token, genres],
        () => searchAlbumsByGenre(token, genres[rockIndex]),
        {
            enabled: !!token  && rockIndex !== -1,
            staleTime: Infinity,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,   
        }
    )

    if (
        loadingCountry || loadingJazz || loadingRomance || loadingPop || loadingChill || loadingFrench ||
        loadingClassical || loadingReggae || loadingGospel || loadingRock || loadingPop || LoadingEnglish || loadingHipHop 
    ) {
        return <ArtistsPageSkeleton />
    }

    if (countryError || jazzError || romanceError || popError || chillError || frenchError || classicalError || reggaeError || gospelError || rockError || hipHopError || britishError) {
        return <ErrorPage />
    }
  return (
      <main className='albums-page'>
          <section>
              <h2>New Releases</h2>
              <Albums albums={newRealeaseAlbums} />
          </section>
          <section>
              <h2>Hip Hop Albums</h2>
              <Albums albums={hiphopAlbums} />
          </section>
          <section>
              <h2>Afrobeat Albums</h2>
              <Albums albums={afrobeatAlbums} />
          </section>
          <section>
              <h2>Acoustic Albums</h2>
              <Albums albums={acousticAlbums} />
          </section>
          <section>
              <h2>Country Albums</h2>
              <Albums albums={countryAlbums} />
          </section>
          <section>
              <h2>Jazz Albums</h2>
              <Albums albums={jazzAlbums} />
          </section>
          <section>
              <h2>Romance Albums</h2>
              <Albums albums={romanceAlbums} />
          </section>
          <section>
              <h2>Pop Albums</h2>
              <Albums albums={popAlbums} />
          </section>
          <section>
              <h2>Rock Albums</h2>
              <Albums albums={rockAlbums} />
          </section>
          <section>
              <h2>Classical Albums</h2>
              <Albums albums={classicalAlbums} />
          </section>
          <section>
              <h2>Reggae Albums</h2>
              <Albums albums={reggaeAlbums} />
          </section>
          <section>
              <h2>Gospel Albums</h2>
              <Albums albums={gospelAlbums} />
          </section>
          <section>
              <h2>Chill Albums</h2>
              <Albums albums={chillAlbums} />
          </section>
          <section>
              <h2>English Albums</h2>
              <Albums albums={britishAlbums} />
          </section>
    </main>
  )
}

export default AlbumsPage