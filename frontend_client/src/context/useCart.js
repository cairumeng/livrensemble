import { useState, useEffect, useContext, createContext } from 'react'
import { useMutation } from 'react-query'
import axios from 'axios'
import useAuth from './useAuth'
import useLocalStorage from '../hooks/useLocalStorage'
import { useHistory, useParams } from 'react-router-dom'

const CART = 'LIVRENSEMBLE_CART'
const CART_INFO = 'LIVRENSEMBLE_CART_INFO'

export const CartContext = createContext()

export const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  const [cartInfo, setCartInfo] = useState({})
  const user = useAuth()
  const history = useHistory()
  const { id } = useParams()

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

  const addToCart = (dish, quantity = 1) => {
    let targetItem = null
    let nextCartItems = cartItems
      .map((item) => {
        if (item.id === dish.id) {
          targetItem = item
          return { ...item, quantity: item.quantity + quantity }
        }
        return item
      })
      .filter((item) => item.quantity !== 0)

    nextCartItems = targetItem
      ? nextCartItems
      : [...cartItems, { ...dish, quantity }]

    if (!user) {
      setLocalCart(nextCartItems)
      setLocalCartInfo({ commandId: id })
    } else {
      if (targetItem) {
        axios.put(`cart-items/${targetItem.id}`, { quantity })
      } else {
        axios.post('cart-items', {
          dishId: dish.id,
          commandId: cartInfo.commandId,
        })
      }
    }
    setCartItems(nextCartItems)
    setCartInfo({ commandId: id })
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
