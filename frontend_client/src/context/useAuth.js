import { useState, useEffect } from 'react'
import { useContext, createContext } from 'react'
import axios from 'axios'
import useLocalStorage from '../hooks/useLocalStorage'
import { useMutation } from 'react-query'
export const AuthContext = createContext({})

export const TOKEN_EXPIRED_AT = 'LIVRENSEMBLE_TOKEN_EXPIRED_AT'
export const TOKEN = 'LIVRENSEMBLE_TOKEN'

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState()
  const [token, setToken] = useState('')
  const { removeLocalItem, getLocalItem } = useLocalStorage()

  useEffect(() => {
    const expiresIn = getLocalItem(TOKEN_EXPIRED_AT)
    if (!expiresIn || expiresIn < Date.now()) {
      removeLocalItem(TOKEN_EXPIRED_AT)
      removeLocalItem(TOKEN)
      return
    }
    const localToken = getLocalItem(TOKEN)
    if (localToken) setToken(localToken)
  }, [])

  const getProfile = useMutation(
    () => {
      axios.post('auth/me')
    },
    {
      onSuccess: ({ data }) => {
        setUser(data)
      },
    }
  )

  useEffect(() => {
    if (!token) return
    axios.defaults.headers.common['Authorization'] = token
    getProfile.mutate()
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
