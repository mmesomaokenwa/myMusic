import React from 'react'
import { CiSettings, CiSearch } from "react-icons/ci";
import { RiSoundcloudLine } from "react-icons/ri";
import { IoIosNotificationsOutline } from "react-icons/io";
import './header.css'

const Header = () => {
  return (
      <header>
          <div className="logo-and-title">
              <RiSoundcloudLine />
              <h1 className="title">myMusic</h1>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="search"><CiSearch size={18}/></label>
              <input type='text' id='search'
                  placeholder='Search Music, Artist, Genre' />
          </form>
          <nav className='header-nav'>
              <ul>
                  <li>User</li>
                  <li><CiSettings /></li>
                  <li><IoIosNotificationsOutline /></li>
              </ul>
          </nav>
    </header>
  )
}

export default Header