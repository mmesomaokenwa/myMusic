import React, { useState } from 'react'
import { CiSearch, CiMusicNote1 } from "react-icons/ci"
import { IoPeopleOutline, IoAlbumsOutline } from "react-icons/io5"
import { VscSignOut, VscSignIn } from "react-icons/vsc";
// import './utilities.css'
import './nav.css'

const Nav = () => {
    const [currentPage, setCurrentPage] = useState('Explore')

  return (
      <nav className='main-nav'>
          <ul className="grid justify-around">
              <li className={currentPage === 'Explore' ? 'current-page': null} onClick={(e) => setCurrentPage(document.querySelector('#explore').textContent)}>
                  <CiSearch />
                  <p id='explore'>Explore</p>
              </li>
              <li className={currentPage === 'Songs' ? 'current-page': null} onClick={(e) => setCurrentPage(document.querySelector('#songs').textContent)}>
                  <CiMusicNote1 />
                  <p id='songs'>Songs</p>
              </li>
              <li className={currentPage === 'Artists' ? 'current-page': null} onClick={(e) => setCurrentPage(document.querySelector('#artists').textContent)}>
                  <IoPeopleOutline />
                  <p id='artists'>Artists</p>
              </li>
              <li className={currentPage === 'Albums' ? 'current-page': null} onClick={(e) => setCurrentPage(document.querySelector('#albums').textContent)}>
                  <IoAlbumsOutline />
                  <p id='albums'>Albums</p>
              </li>
          </ul>
          <div className="auth-btn">
              <button><VscSignIn /></button>
          </div>
    </nav>
  )
}

export default Nav