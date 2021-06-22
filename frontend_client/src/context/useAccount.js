import { useContext, createContext } from 'react'

export const UserContext = createContext({})

const useAccount = () => useContext(UserContext)
export default useAccount
