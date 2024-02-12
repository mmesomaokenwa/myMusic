import React from 'react'
import './AuthError.css'

const AuthError = ({ errorMessage, setErrorMessage }) => {
  return (
    <div className={errorMessage ? 'error-message-container' : 'hidden'}>
        <p className="error-message">{errorMessage}</p>
        <button onClick={() => setErrorMessage('')}>Close</button>
    </div>
  )
}

export default AuthError