import React, { useContext, useEffect } from 'react'
import UserAuthContext from '../../context/userAuthContext'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
    const { user } = useContext(UserAuthContext)
    const isAuth = user ? true : false
    const navigate = useNavigate()
    
    useEffect(() => {
        if (!isAuth) {
            navigate('/login', { replace: true })
        }
    }, [isAuth, navigate])
    
    return children
}

export default ProtectedRoute