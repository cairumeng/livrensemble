import { useState, useEffect, useContext, createContext } from 'react'
import { useMutation } from 'react-query'
import axios from 'axios'
import useAuth from './useAuth'
import useLocalStorage from '../hooks/useLocalStorage'
import { useHistory } from 'react-router-dom'

const CART = 'LIVRENSEMBLE_CART'
const CART_INFO = 'LIVRENSEMBLE_CART_INFO'

export const CartContext = createContext()

export const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [cartInfo, setCartInfo] = useState({})
  const user = useAuth()
  const history = useHistory()

  const { getLocalItem, setLocalItem, removeLocalItem } = useLocalStorage()

  const getLocalCart = () => getLocalItem(CART, [])
  const setLocalCart = (nextCartItems) =>
    setLocalItem(CART, nextCartItems || [])
  const cleanLocalCart = () => removeLocalItem(CART)

  const getLocalCartInfo = () => getLocalItem(CART_INFO, {})
  const setLocalCartInfo = (nextCartInfo) =>
    setLocalItem(CART_INFO, nextCartInfo)
  const cleanLocalCartInfo = () => removeLocalItem(CART_INFO)

  const loginSuccessRedirect = () => history.push('/')

  useEffect(() => {
    if (user) return
    setCartInfo(getLocalCartInfo())
    setCartItems(getLocalCart())
  }, [])

  useEffect(() => {
    if (!user) return
    if (cartInfo.commandId) {
      synchronizeCart.mutate({
        cartItems: cartItems,
        commandId: cartInfo.commandId,
      })
    } else {
      getCartItems.mutate()
    }
  }, [user])

  const synchronizeCart = useMutation(
    ({ cartItems, commandId }) =>
      axios.post('/cart-items/scynchronize', {
        cartItems,
        commandId,
      }),
    {
      onSuccess: ({ data }) => {
        cleanLocalCart()
        cleanLocalCartInfo()
        setCartItems(data.cartItems || [])
        setCartInfo(data.cartInfo || {})
      },
    }
  )

  const getCartItems = useMutation(() => axios.get('/cart-items'), {
    onSuccess: ({ data }) => {
      setCartItems(data.cartItems || [])
      setCartInfo(data.cartInfo || {})
    },
  })

  const addToCart = (commandId, cartItem, quantity = 1) => {
    let targetItem = null
    let nextCartItems = cartItems
      .map((item) => {
        if (item.dish_id === cartItem.dish_id) {
          targetItem = item
          return { ...item, quantity: item.quantity + quantity }
        }
        return item
      })
      .filter((item) => item.quantity !== 0)

    if (!user) {
      if (!targetItem) nextCartItems = [...cartItems, { ...cartItem, quantity }]

      setLocalCart(nextCartItems)
      setLocalCartInfo({ commandId })
      setCartItems(nextCartItems)
      !cartInfo.commandId && setCartInfo({ commandId })
      return
    }

    if (targetItem) {
      axios.put(`cart-items/${targetItem.id}`, { quantity })
      setCartItems(nextCartItems)
    } else {
      axios
        .post('cart-items', {
          dishId: cartItem.dish_id,
          commandId,
        })
        .then(({ data }) => {
          setCartItems([...cartItems, data.data])
          !cartInfo.commandId && setCartInfo({ commandId })
        })
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        getCartItems,
        cartInfo,
        setCartInfo,
        addToCart,
        synchronizeCart,
        setLocalCartInfo,
        getLocalCartInfo,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

const useCart = () => useContext(CartContext)
export default useCart
