import { useState, useEffect } from 'react'
import { useContext, createContext } from 'react'
import axios from 'axios'
export const AuthContext = createContext({})

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState()
  const [token, setToken] = useState('')

  useEffect(() => {
    // const expiresIn = localStorage.getItem('LIVRENSEMBLE_TOKEN_EXPIRED_AT')

    // if (!expiresIn || expiresIn < Date.now()) {
    //   localStorage.removeItem('LIVRENSEMBLE_TOKEN_EXPIRED_AT')
    //   localStorage.removeItem('LIVRENSEMBLE_TOKEN')
    //   return
    // }

    const localToken = localStorage.getItem('LIVRENSEMBLE_TOKEN')
    if (localToken) setToken(localToken)
  }, [])

  useEffect(() => {
    if (!token) return

    axios.defaults.headers.common['Authorization'] = token
    axios.post('auth/me').then(({ data }) => {
      setUser(data)
    })
  }, [token])

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)
export default useAuth
