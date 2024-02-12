import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserAuthContext = createContext()

export const UserAuthProvider = ({ children }) => {
    const navigate = useNavigate()

    const [user, setUser] = useState((localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')) : null)

    const [users, setUsers] = useState([])
    
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem('user'))
        setUser(user)
    }, [])
    const login = (data) => {
        setUser(data)
        localStorage.setItem('user', JSON.stringify(data))
        navigate('/')
    }
    const logout = () => {
        setUser(null)
        localStorage.removeItem('user')
        navigate('/')
    }
    return (
        <UserAuthContext.Provider value={{ user, setUser, users, setUsers, login, logout }}>
            {children}
        </UserAuthContext.Provider>
    )
}

export default UserAuthContext