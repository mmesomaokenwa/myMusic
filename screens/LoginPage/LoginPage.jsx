import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserAuthContext from '../../context/userAuthContext'
import AuthError from '../../components/AuthError/AuthError'
import './LoginPage.css'
import defaultUsers from '../../data/users'

const LoginPage = () => {
  const navigate = useNavigate()

  const [errorMessage, setErrorMessage] = useState('')
  
  const { users, setUsers, login } = useContext(UserAuthContext)
  
  useEffect(()=>{
    setUsers(defaultUsers)
  }, [])

  console.log(users)

    const handleSubmit = (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value
      const password = document.getElementById('password').value
      if (!email || !password) {
        setErrorMessage("Email and Password are required.");
        return
      }
      if (!users.some((u) => u.email === email)) {
        // user not found in database
        setErrorMessage("Email or Password is incorrect.")
        return
      }
      let userObj = users.find((u) => u.email === email)
      if (userObj.password !== password){
        setErrorMessage("Password is incorrect.");
        return
      }

      login(userObj)
    }
  return (
      <main  className="login-page">
        <div className="login-container">
              <form className="login-form" action="" method="get" onSubmit={handleSubmit}>
                <h1>Sign In</h1>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" id="email" />
                </div>
                <div>       
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" />
                </div>
              <button className='login-btn' onClick={handleSubmit} type="submit">Sign In</button>
              <p>Forgot Password? <button onClick={() => navigate('/reset-password')}>Reset</button></p>
              <p>Or</p>
              <p>Don't have an account? <button onClick={() => navigate('/signup')}>Sign Up</button></p>
          </form>
      </div>
      <AuthError errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
    </main>
  )
}

export default LoginPage