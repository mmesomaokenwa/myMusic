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
