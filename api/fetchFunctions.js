export const getAccessToken = async (url, clientID, clientSecret) => {
    try {
        const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `grant_type=client_credentials&client_id=${clientID}&client_secret=${clientSecret}`
        });
        if (!response.ok) throw new Error(response.statusText)
        const data = await response.json();
        return data.access_token;
    } catch (err) {
        console.log(err);
    }
}

export const getData = async (token, endpoint, baseURL = 'https://api.spotify.com/v1') => {
    try { 
        const res = await fetch(`${baseURL}${endpoint}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (!res.ok) throw new Error(res.statusText)
        return await res.json()
        // return await Promise.all([res.status, res.json()]);
    }
    catch (err) {
        console.log(err);
    }
}

export const getTracksFromPlaylist = async (token, id) => { 
    let tracks = await  getData(token, `/playlists/${id}/tracks`);
    if(!tracks) return;
    tracks = tracks.items;
    const newTracks = tracks.map((track , index)=> {
        return {
        number: index + 1,
        id:  track.track.id,
        name: track.track.name,
        artist: track.track.artists[0].name,
        image: track.track.album.images[1] ? track.track.album.images[1].url : track.track.album.images[0].url,
        audio: track.track.preview_url,
        length:  track.track.duration_ms / 1000
        }
    })
    return newTracks;
}

export const searchArtistsByGenre = async (token, genre) => {
    let artists = await getData(token, `/search?q=${encodeURIComponent(`genre:"${genre}"`)}&type=artist`);
    if (!artists) return;
    artists = artists.artists.items;
    return artists.map(artist => {
        return {
            id: artist.id,
            name: artist.name,
            image: artist.images[0] ? artist.images[0].url : '',
            popularity: artist.popularity,
            followers: artist.followers.total,
            genres: artist.genres
        }
    })
}

export const searchAlbumsByArtist = async (token, artistId) => {
    let albums = await getData(token, `/artists/${artistId}/albums?include_groups=album,single&limit=50`);
    if (!albums) return;
    albums = albums.items;
    return albums.map(album => {
        return {
            id: album.id,
            name: album.name,
            image: album.images[0] ? album.images[0].url : '',
            releaseDate: album.release_date,
            albumType: album.album_type
        }
    })
}

export const searchTracksByArtist = async (token, artistId) => {
    let tracks = await getData(token, `/artists/${artistId}/top-tracks?market=US`);
    if (!tracks) return;
    console.log(tracks);
    tracks = tracks.tracks;
    return tracks.map((track, index) => {
        return {
            number: index + 1,
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            image: track.album.images[1] ? track.album.images[1].url : track.album.images[0].url,
            audio: track.preview_url,
            length: track.duration_ms / 1000
        }
    })
}

export const searchTracksByAlbum = async (token, albumId) => {
    let tracks = await getData(token, `/albums/${albumId}/tracks`);
    if (!tracks) return;
    tracks = tracks.items;
    return tracks.map((track, index) => {
        return {
            number: index + 1,
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            image: null,
            audio: track.preview_url,
            length: track.duration_ms / 1000
        }
    })
}