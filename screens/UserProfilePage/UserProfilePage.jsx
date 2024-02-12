import React, { useState, useEffect, useContext } from 'react'
import UserAuthContext from '../../context/userAuthContext'
import './UserProfilePage.css'
import { useNavigate } from 'react-router-dom'

const UserProfilePage = () => {
    const {user, logout} = useContext(UserAuthContext)
    const [userData, setUserData] = useState(null)
    const navigate = useNavigate()
    // Fetch user data on component mount and update state with the response data if successful
    useEffect(()=>{
        setUserData(user)
    },[])

  return (
      <main className="user-profile-page">
          {!userData ? (
              <>
                  <p>Loading...</p>
                  <p>Please wait while we load your profile data</p>
              </>
          ) : (
                  // Render user profile data
              <>
                  <h1 className="profile-title">Your Profile</h1>
                  <div className='profile-container'>
                    <img className="profile-image" src={userData.image} alt="profile" />
                        <div>
                            <p><strong>Username:</strong> {userData.username}</p>
                            <p><strong>Email:</strong> {userData.email}</p>
                            <button onClick={() => navigate('/edit-account')}>Edit Account</button>
                          </div>
                          <button className='logout' onClick={logout}>Sign Out</button>
                </div>
              </>
          )}
    </main>
  )
}

export default UserProfilePage