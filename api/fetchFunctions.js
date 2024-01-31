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
        console.log(err.message);
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
    }
    catch (err) {
        console.log('Fetch error : ', err);
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