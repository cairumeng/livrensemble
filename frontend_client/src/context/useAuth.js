import { useState, useEffect } from 'react'
import { useContext, createContext } from 'react'
import axios from 'axios'
import useLocalStorage from '../hooks/useLocalStorage'
import { useMutation } from 'react-query'
import { useHistory } from 'react-router-dom'
export const AuthContext = createContext({})
export const TOKEN_EXPIRED_AT = 'LIVRENSEMBLE_TOKEN_EXPIRED_AT'
export const TOKEN = 'LIVRENSEMBLE_TOKEN'

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const { removeLocalItem, getLocalItem, setLocalItem } = useLocalStorage()
  const history = useHistory()
  const getLocalToken = () => getLocalItem(TOKEN)

  const getProfileMutation = useMutation(() => axios.post('auth/me'), {
    onSuccess: ({ data }) => {
      setUser(data)
    },
  })

  const initializeUser = (token) => {
    axios.defaults.headers.common['Authorization'] = token
    getProfileMutation.mutate()
  }

  useEffect(() => {
    // const expiresIn = getLocalItem(TOKEN_EXPIRED_AT)
    // if (!expiresIn || expiresIn < Date.now()) {
    //   removeLocalItem(TOKEN_EXPIRED_AT)
    //   removeLocalItem(TOKEN)
    //   return
    // }
    const localToken = getLocalToken()
    if (localToken) {
      initializeUser(localToken)
    }
  }, [])

  const loginMutation = useMutation(
    ({ email, password }) => axios.post('auth/login', { email, password }),
    {
      onSuccess: ({ data }) => {
        const token = `Bearer ${data.access_token}`
        initializeUser(token)
        setLocalItem(TOKEN, token)
        setLocalItem(TOKEN_EXPIRED_AT, Date.now() + data.expires_in - 60)
        history.goBack()
      },
    }
  )

  const logout = () => {
    axios.post('auth/logout')
    removeLocalItem(TOKEN)
    removeLocalItem(TOKEN_EXPIRED_AT)
    window.location.reload()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
        loginMutation,
        getProfileMutation,
        getLocalToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)
export default useAuth
