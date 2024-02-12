import React, { useContext, useState, useEffect } from 'react'
import './ResetPasswordPage.css'
import { useNavigate } from 'react-router-dom'
import UserAuthContext from '../../context/userAuthContext'
import defaultUsers from '../../data/users'
import AuthError from '../../components/AuthError/AuthError'

const ResetPasswordPage = () => {
    const navigate = useNavigate()
    const { users, setUsers } = useContext(UserAuthContext)

    const [email, setEmail] = useState('')

    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    useEffect(() => {
        setUsers(defaultUsers)
    }, [])

    // Handles form submission to reset password
    const handleSubmit = async (e) => {
        e.preventDefault()

        const user = users.find((u) => u.email === email);
        if (!user) {
            setErrorMessage('User not found')
            return
        }
        // Send password reset email to user's email address
        console.log(`Sending password reset link to ${user.email}`)
        setSuccessMessage('Password reset link sent to email')
        setErrorMessage('')

        setTimeout(() => {
            setSuccessMessage('')
        }, 3000)
    }
    
    
    
  return (
      <main className="reset-password-page">
          <div className="reset-password-container">
              <form className='reset-password-form' action="" method="get" onSubmit={handleSubmit}>
                  <h1>Reset Password</h1>
                  {successMessage && (
                      <div className="success-message">
                          {successMessage}
                      </div>
                  )}
                  <div>
                      <label htmlFor="email">Email:</label>
                      <input type="email" name="email" id="email" value={email}   onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <button type="submit">Submit</button>
              </form>
          </div>
          <AuthError errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
    </main>
  )
}

export default ResetPasswordPage