import React, { useContext, useEffect, useMemo } from 'react'
import './ArtistsPage.css'
import genres from '../../data/genres'
import DataContext from '../../context/DataContext'
import { useQuery } from 'react-query'
import { searchArtistsByGenre } from '../../api/fetchFunctions'
import ArtistsPageSkeleton from '../../skeletons/ArtistsPageSkeleton/ArtistsPageSkeleton'
import Artists from '../../components/Artists/Artists'

const ArtistsPage = () => {
    const { token } = useContext(DataContext);

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

    const { data: acousticArtists, error: acousticError, isLoading: LoadingAcoustic } = useQuery(
        ['acoustic', token, genres],
        async () => { const response =  searchArtistsByGenre(token, genres[acousticIndex]) },
        {
            enabled: !!token && acousticIndex !== -1,
            staleTime: Infinity,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
        }
    )
    
    const { data: afrobeatArtists, error: afrobeatError, isLoading: LoadingAfro } = useQuery(
        ['afrobeat', token, genres],
        async () => { const response = await searchArtistsByGenre(token, genres[afrobeatIndex]); if (response) return response; throw new Error('afrobeat fetch error')},
        {
            enabled: !!token && afrobeatIndex !== -1,
            staleTime: Infinity,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,         
        }
    )
    
    const { data: britishArtists, error: britishError, isLoading: LoadingEnglish } = useQuery(
        ['british', token, genres],
        () => searchArtistsByGenre(token, genres[britishIndex]),
        {
            enabled: !!token && britishIndex !== -1,
            staleTime: Infinity,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,   
        }
    )
    
    const { data: hiphopArtists, error: hipHopError, isLoading: loadingHipHop } = useQuery(
        ["hiphop", token, genres],
        () => searchArtistsByGenre(token, genres[hiphopIndex]),
        {
            enabled: !!token && hiphopIndex !==  -1,
            staleTime: Infinity,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,    
        }
    )
    
    const { data: countryArtists, error: countryError, isLoading: loadingCountry } = useQuery(
        ['country', token, genres],
        () => searchArtistsByGenre(token, genres[countryIndex]),
        {
            enabled:  !!token && countryIndex !== -1,
            staleTime: Infinity,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,    
        }
    )
    
    const { data: jazzArtists, error: jazzError, isLoading: loadingJazz } = useQuery(
        ['jazz', token, genres],
        () => searchArtistsByGenre(token, genres[jazzIndex]),
        {
            enabled:  !!token && jazzIndex !== -1,
            staleTime: Infinity,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,    
        }
    )
    
    const { data: romanceArtists, error: romanceError, isLoading: loadingRomance } = useQuery(
        ['romance', token, genres],
        () => searchArtistsByGenre(token, genres[romanceIndex]),
        {
            enabled: !!token  && romanceIndex !== -1,
            staleTime: Infinity,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,    
        }
    )
    
    const { data: popArtists, error: popError, isLoading: loadingPop } = useQuery(
        ['pop', token, genres],
        () => searchArtistsByGenre(token, genres[popIndex]),
        {
            enabled: !!token  && popIndex !== -1,
            staleTime: Infinity,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            
        }
    )
    
    const { data: chillArtists, error: chillError, isLoading: loadingChill } = useQuery(
        ['chill', token, genres],
        () => searchArtistsByGenre(token, genres[chillIndex]),
        {
            enabled: !!token  && chillIndex !== -1,
            staleTime: Infinity,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,    
        }
    )
    
    const { data: frenchArtists, error: frenchError, isLoading: loadingFrench } = useQuery(
        ['french', token, genres],
        () => searchArtistsByGenre(token, genres[frenchIndex]),
        {
            enabled: !!token  && frenchIndex !== -1,
            staleTime: Infinity,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,    
        }
    )
    
    const { data: classicalArtists, error: classicalError, isLoading: loadingClassical } = useQuery(
        ['classical', token, genres],
        () => searchArtistsByGenre(token, genres[classicalIndex]),
        {
            enabled: !!token &&  classicalIndex !== -1,
            staleTime: Infinity,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,   
        }
    )
    
    const { data: reggaeArtists, error: reggaeError, isLoading: loadingReggae } = useQuery(
        ['reggae', token, genres],
        () => searchArtistsByGenre(token, genres[reggaeIndex]),
        {
            enabled: !!token  && reggaeIndex !== -1,
            staleTime: Infinity,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,    
        }
    )
    
    const { data: gospelArtists, error: gospelError, isLoading: loadingGospel } = useQuery(
        ['gospel', token, genres],
        () => searchArtistsByGenre(token, genres[gospelIndex]),
        {
            enabled:  !!token && gospelIndex !== -1,
            staleTime: Infinity,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,    
        }
    )
    
    const { data: rockArtists, error: rockError, isLoading: loadingRock } = useQuery(
        ['rock', token, genres],
        () => searchArtistsByGenre(token, genres[rockIndex]),
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
    <main className='artists-page'>
          <section>
              <h2>Hip-Hop Artists</h2>
              <Artists artists={hiphopArtists} />
          </section>   
          <section>
              <h2>Afrobeat Artists</h2>
              <Artists artists={afrobeatArtists} />
          </section>   
          <section>
              <h2>English Artists</h2>
              <Artists artists={britishArtists} />
          </section>   
          <section>
              <h2>Pop Artists</h2>
              <Artists artists={popArtists} />
          </section>   
          <section>
              <h2>Rock Artists</h2>
              <Artists artists={rockArtists} />
          </section>   
          <section>
              <h2>Classical Artists</h2>
              <Artists artists={classicalArtists} />
          </section>   
          <section>
              <h2>Chill Artists</h2>
              <Artists artists={chillArtists} />
          </section>   
          <section>
              <h2>Reggae Artists</h2>
              <Artists artists={reggaeArtists} />
          </section>   
          <section>
              <h2>Gospel Artists</h2>
              <Artists artists={gospelArtists} />
          </section>   
          <section>
              <h2>Jazz Artists</h2>
              <Artists artists={jazzArtists} />
          </section> 
          <section>
              <h2>Country Artists</h2>
              <Artists artists={countryArtists} />
          </section>
          <section>
              <h2>Romance Artists</h2>
              <Artists artists={romanceArtists} />
          </section>
    </main>
  )
}

export default ArtistsPage