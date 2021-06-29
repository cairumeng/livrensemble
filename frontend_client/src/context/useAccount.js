import { useContext, createContext } from 'react'

export const AccountContext = createContext()

const useAccount = () => useContext(AccountContext)
export default useAccount
