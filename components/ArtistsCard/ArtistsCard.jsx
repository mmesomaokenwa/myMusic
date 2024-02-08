import React from 'react'
import './ArtistsCard.css'
import { useNavigate } from 'react-router-dom'

const ArtistsCard = ({ artist }) => {
    const navigate = useNavigate();

    const backgroundImageStyle = {
        backgroundImage: `url(${artist?.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    }

    const formatFollowers = followers => {
        const absFollowers = Math.abs(followers);

        if (absFollowers >= 1e9) return (followers / 1e9).toFixed(1) + 'B';
        else if (absFollowers >= 1e6) return (followers / 1e6).toFixed(1) + 'M';
        else if (absFollowers >= 1e3) return (followers / 1e3).toFixed(1) + 'K';
        else return followers.toString();   
    }

  return (
      <li className='artist-card' style={backgroundImageStyle} onClick={() => navigate(`/artists/${artist?.id}`)}>
          <div>
              <p className='artist-name'>{artist?.name}</p>
              <p className='followers'>{artist.followers && `${formatFollowers(artist?.followers)} followers`}</p>
          </div>
    </li>
  )
}

export default ArtistsCard