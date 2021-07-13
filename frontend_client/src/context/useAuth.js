import { useContext, createContext } from 'react'

export const AuthContext = createContext()

const useAuth = () => useContext(AuthContext)
export default useAuth
