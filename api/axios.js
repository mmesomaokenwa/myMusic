import { clientID, clientSecret } from "./client";
import axios from 'axios';

const api = axios.create({
    baseURL: `https://api.spotify.com/v1`,
    headers: {
        'Authorization': `Bearer ${accessToken}`
    }
})

export default api