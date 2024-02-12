import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { CiSettings, CiSearch } from "react-icons/ci";
import { RiSoundcloudLine } from "react-icons/ri";
import { IoIosNotificationsOutline } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import UserAuthContext from '../../context/userAuthContext'
import './header.css'

const Header = () => {
    const { user } = useContext(UserAuthContext)
    const navigate = useNavigate()
  return (
      <header>
          <div className="logo-and-title">
              <RiSoundcloudLine />
              <h1 className="title">myMusic</h1>
          </div>
          <form className='search-bar' onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="search"><CiSearch size={18}/></label>
              <input type='text' id='search'
                  placeholder='Search Music, Artist, Genre' />
          </form>
          <nav className='header-nav'>
              <ul>
                  <li>{!user ? (
                      <button onClick={() => navigate('/login')}><FaUserCircle /></button>
                  ) : (
                          <button onClick={() => navigate(`/profile/${user.username}`)}>
                              <img src={user.image} alt="profile" />
                      </button>
                  )}</li>
                  <li onClick={() => navigate('/settings')}><CiSettings /></li>
                  <li><IoIosNotificationsOutline /></li>
              </ul>
          </nav>
    </header>
  )
}

export default Header