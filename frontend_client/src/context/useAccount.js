import React, { useContext, createContext } from 'react'

export const AccountContext = React.createContext()

const useAccount = () => useContext(AccountContext)
export default useAccount
