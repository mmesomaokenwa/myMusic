import React from 'react'
import './UserAuth.css'
import { useNavigate } from 'react-router-dom'

const UserAuth = () => {
    const navigate = useNavigate()
  return (
      <main>
          <div className="user-auth-container">
              <div>
                  <p>Please login to view your library</p>
                    <button onClick={() => navigate('/login')}>Sign In</button>
              </div>
          </div>
    </main>
  )
}

export default UserAuth