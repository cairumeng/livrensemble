import { FaPlus, FaMinus } from 'react-icons/fa'
import { GiBrokenHeartZone } from 'react-icons/gi'
import { useHistory, useParams } from 'react-router-dom'
import Button from 'react-rainbow-components/components/Button'
import useCart from '../../../context/useCart'

const getPrice = (item) => item.price * (1 - item.promo) * item.quantity

const CartItemList = ({ cartItems, addToCart, commandId }) =>
  cartItems.map((item) => (
    <div key={item.dish_id}>
      <div className="flex justify-between mt-4">
        <div className="flex">
          <div className="font-bold">{item.quantity}</div>
          <div className="font-bold capitalize ml-3">{item.name}</div>
        </div>
        <div className="text-gray-500 euro">{getPrice(item).toFixed(2)}</div>
      </div>
      <div className="text-right my-4">
        <Button
          variant="neutral"
          className="w-8 h-8 p-1 rounded-none"
          onClick={() => addToCart(commandId, item, -1)}
        >
          <FaMinus className="text-blue-500" />
        </Button>
        <Button
          variant="neutral"
          className="w-8 h-8 p-1 rounded-none ml-2"
          onClick={() => addToCart(commandId, item, 1)}
        >
          <FaPlus className="text-blue-500" />
        </Button>
      </div>
    </div>
  ))

const CartEmptyState = () => (
  <div className="text-center mt-20">
    <GiBrokenHeartZone className="text-4xl text-red-500 mx-auto" />
    <div className="font-bold my-2">Fill your grocery basket</div>
    <div className="text-gray-500 text-sm">
      You have nothing in your cart! Add the food you like and command!
    </div>
  </div>
)

const Cart = ({ goBackUrl }) => {
  const history = useHistory()
  const { id } = useParams()
  const { cartItems, addToCart } = useCart()

  const totalReduction = cartItems?.reduce(
    (reduction, item) => reduction + item.price * item.promo * item.quantity,
    0
  )
  return (
    <div className="sticky top-0">
      <div className="text-lg font-bold font-sans text-center my-4 ">
        Panier
      </div>
      <hr />
      <div className="px-5 divide-y">
        {cartItems.length === 0 ? (
          <CartEmptyState />
        ) : (
          <>
            <CartItemList
              cartItems={cartItems}
              addToCart={addToCart}
              commandId={id}
            />

            <div>
              {totalReduction > 0 && (
                <div className="flex justify-between text-gray-500 mt-3">
                  <div>Reduction</div>
                  <div className="euro">-{totalReduction.toFixed(2)}</div>
                </div>
              )}
              <div className="flex justify-between font-bold mt-3">
                <div>Total</div>
                <div className="euro">
                  {cartItems
                    .reduce((sum, current) => sum + getPrice(current), 0)
                    .toFixed(2)}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {goBackUrl && (
        <div className="text-right px-5">
          <Button
            className="mt-5"
            variant="success"
            label="Go back"
            onClick={() => history.push(goBackUrl)}
          />
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="p-5">
          <Button className="mt-10 w-full" variant="brand" label="Command" />
        </div>
      )}
    </div>
  )
}

export default Cart
