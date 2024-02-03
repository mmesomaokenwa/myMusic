import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { CiSearch, CiMusicNote1 } from "react-icons/ci"
import { IoPeopleOutline, IoAlbumsOutline } from "react-icons/io5"
import { VscSignOut, VscSignIn } from "react-icons/vsc";
// import './utilities.css'
import './nav.css'

const Nav = () => {

  return (
      <nav className='main-nav'>
          <ul className="grid justify-around">
              <li>
                  <NavLink to='/' className={({ isActive }) => isActive ? 'current-page link' : 'link'}>
                    <CiSearch />
                    <p className='page-name'>Explore</p>
                  </NavLink>
              </li>
              <li>
                  <NavLink to='/songs' className={({ isActive }) => isActive ? 'current-page link' : 'link'}>
                      <CiMusicNote1 />
                    <p className='page-name'>Songs</p>
                  </NavLink>
              </li>
              <li>
                  <NavLink to='/artists' className={({ isActive }) => isActive ? 'current-page link' : 'link'}>
                      <IoPeopleOutline />
                    <p className='page-name'>Artists</p>
                  </NavLink>
              </li>
              <li>
                  <NavLink to='/albums' className={({ isActive }) => isActive ? 'current-page link' : 'link'}>
                    <IoAlbumsOutline />
                    <p className='page-name'>Albums</p>
                  </NavLink> 
              </li>
          </ul>
          <div className="auth-btn">
              <button><VscSignIn /></button>
          </div>
    </nav>
  )
}

export default Nav