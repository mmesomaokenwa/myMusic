import React, { useState, useContext, useEffect } from 'react'
import './SignUpPage.css'
import { useNavigate } from 'react-router-dom'
import AuthError from '../../components/AuthError/AuthError'
import UserAuthContext from '../../context/userAuthContext'
import defaultUsers from '../../data/users'

const usernameRegex = /^[a-zA-Z0-9]+$/
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/


const SignUpPage = () => {
    const navigate = useNavigate()

    const [errorMessage, setErrorMessage] = useState('')

    const { users, setUsers, login } = useContext(UserAuthContext)
    
    useEffect(()=>{
        setUsers(defaultUsers)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        const confirmPassword = document.getElementById('confirm-password').value
        if (!username?.trim() || !email?.trim() || !password?.trim() || !confirmPassword?.trim()) {
            return setErrorMessage("Please fill out all fields.");
        }
        if (!usernameRegex.test(username)) {
            return setErrorMessage("Username can only contain letters and numbers.");
        }
        if (!emailRegex.test(email)) {
            return setErrorMessage("Invalid email address.");
        }
        if (!passwordRegex.test(password)) {
            return setErrorMessage("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
        }
        if (password !== confirmPassword) {
            return setErrorMessage("Passwords do not match.");
        }
        if (users.some((u) => u.username === username)) {
            return setErrorMessage("Username already exists.");
        }
        const image = await generateRandomAvatar(username).catch(() => {
            return 'https://i.pravatar.cc/300?u=' + username
        })
        let userObj = {username, email, password, image}
        setUsers([...users, userObj])
        login(userObj)
    }
  return (
      <main>
          <div className="sign-up-container">
              <form className="sign-up-form" action="" method="post"  onSubmit={handleSubmit}>
                  <h1>Sign Up</h1>
                  <div>
                      <label htmlFor="username">Username</label>
                      <input type="text" name="username" id="username" required/>
                  </div>
                  <div>
                      <label htmlFor="email">Email</label>
                      <input type="email" name="email" id="email" required/>
                  </div>
                  <div>
                      <label htmlFor="password">Password</label>
                      <input type="password" name="password" id="password" required/>
                  </div>
                  <div>
                      <label htmlFor="confirm-password">Confirm Password</label>
                      <input type="password" name="confirm-password" id="confirm-password" required/>
                  </div>
                  <button onClick={handleSubmit} className='sign-up-btn' type="submit">Sign Up</button>
                  <p>Already have an account? <button onClick={() => navigate('/login')}>Sign In</button></p>
              </form>
          </div>
          <AuthError errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
    </main>
  )
}

export default SignUpPage

async function generateRandomAvatar(username) {
  const avatarUrl = `https://robohash.org/${username}.png`; // Use the username in the avatar URL
  const response = await fetch(avatarUrl); // Fetch the avatar image
  if (response.ok) {
    return avatarUrl; // Return the avatar URL
  } else {
    throw new Error('Failed to fetch avatar');
  }
}