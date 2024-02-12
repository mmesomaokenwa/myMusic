import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './EditAccountPage.css'
import UserAuthContext from '../../context/userAuthContext'
import AuthError from '../../components/AuthError/AuthError'
import { FaExchangeAlt } from "react-icons/fa";

const usernameRegex = /^[a-zA-Z0-9]+$/
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/

const EditAccountPage = () => {
    const { user, setUser, users, setUsers } = useContext(UserAuthContext)

    const [username, setUsername] = useState(user?.username)
    const [email, setEmail] = useState(user?.email)
    const [password, setPassword] = useState(user?.password)
    const [confirmPassword, setConfirmPassword] = useState(user?.password)
    const [profileImage, setProfileImage] = useState(user?.image)

    const [disabled, setDisabled] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate()


    useEffect(() => {
        if (username !== user?.username || email !== user?.email || password !== user?.password || profileImage !== user?.image) {
            return setDisabled(false)
        }
        if (!username?.trim() || !email?.trim() || !password?.trim() || !confirmPassword?.trim()) {
            return setDisabled(true)
        } 
        if (!usernameRegex.test(username) || !emailRegex.test(email) || !passwordRegex.test(password)) {
            return setDisabled(true)
        }
        if (password !== confirmPassword) {
            return setDisabled(true)
        }
    }, [username, email, password, confirmPassword, profileImage])

    const handleSubmit = e => {
        e.preventDefault()

        const newUser = {
            username,
            email,
            password,
            image: profileImage
        }
        
        setUser(newUser)
        setUsers((prevUsers) => {
            const updatedUsers = prevUsers.map((u) => {
                if (u.username === user.username) {
                    return newUser
                }
                return u
            })
            return updatedUsers
        })
        localStorage.setItem('user', JSON.stringify(newUser))
        navigate(`/profile/${user?.username}`)
    }

    const handleCancel = e => {
        e.preventDefault()
        setUsername(user?.username)
        setEmail(user?.email)
        setPassword(user?.password)
        setConfirmPassword(user?.password)
        setDisabled(true)
        navigate(-1)
    }

    const changeImage = () => {
        // allow the user to upload an image
        let fileInput = document.createElement("input")
        fileInput.type = "file"
        fileInput.accept = ".jpg,.png"
        fileInput.onchange = e => {
            setProfileImage(URL.createObjectURL(e.target.files[0]))
        }
        fileInput.click()
    }

    
  return (
      <main className='edit-profile-page'>
          <div className="edit-container">
              <h1>Edit Account</h1>
              <div className="image-container">
                  <img src={profileImage} alt="" />
                  <button className='change-image-button' onClick={changeImage}><FaExchangeAlt /></button>
              </div>
          <form onSubmit={handleSubmit} className='edit-profile-form' action="" method="post">
              <div>
                  <label htmlFor="username">Username:</label>
                  <input type="text" id='username' name='username' value={username} onChange={e => setUsername(e.target.value)}/>
              </div>
              <div>
                  <label htmlFor="email">Email:</label>
                  <input type="email" id='email' name='email' value={email} onChange={e => setEmail(e.target.value)}/>
              </div>
              <div>
                  <label htmlFor="password">Password:</label>
                  <input type="password" id='password'name='password' value={password} onChange={e => setPassword(e.target.value)}/>
              </div>
              <div>
                  <label htmlFor="confirm-password">Confirm Password:</label>
                  <input type="password" id='confirm-password' name='confirm-password'value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)}/>
              </div>
                  <button disabled={disabled} className='save-btn' type='submit' onClick={handleSubmit}>Save Changes</button>
                  <button type='button' className='cancel-btn' onClick={handleCancel}>Cancel</button>
          </form>
          </div>
          <AuthError errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
    </main>
  )
}

export default EditAccountPage