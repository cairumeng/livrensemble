import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Cart from './restaurant-commands/Show/Cart'
import Textarea from 'react-rainbow-components/components/Textarea'
import Input from 'react-rainbow-components/components/Input'
import Button from 'react-rainbow-components/components/Button'
import Modal from 'react-rainbow-components/components/Modal'
import axios from 'axios'
import CitySearch from '../components/CitySearch'
import { useMutation } from 'react-query'
import useCart from '../context/useCart'
import Spinner from 'react-rainbow-components/components/Spinner'

const Checkout = () => {
  const [initialAddress, setInitialAddress] = useState({})
  const [address, setAddress] = useState({})
  const [deliveryAddressOption, setDeliveryAddressOption] = useState(null)
  const [note, setNote] = useState()
  const { setCartInfo, setCartItems } = useCart()
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false)
  const [isCartEmptyModalOpen, setCartEmptyModalOpen] = useState(false)
  const [clientCommandId, setClientCommandId] = useState(null)
  const history = useHistory()

  useEffect(() => {
    getAddressMutation.mutate()
  }, [])

  const getAddressMutation = useMutation(() => axios.get('/addresses'), {
    onSuccess: ({ data }) => {
      setDeliveryAddressOption(data.deliveryAddressOption)
      let address = data.address
      if (data.deliveryAddressOption === 0 && address.id) {
        address = {
          ...address,
          city: {
            label: `${data.address.city.name}, ${data.address.city.postal_code}`,
            id: data.address.city.id,
          },
        }
      }
      setAddress(address)
      setInitialAddress(address)
    },
    onError: () => {
      setCartEmptyModalOpen(true)
    },
  })

  const submitCommand = useMutation(
    () =>
      axios.post('/client-commands', {
        isAddressUpdated:
          deliveryAddressOption === 1
            ? false
            : JSON.stringify(address) === JSON.stringify(initialAddress),
        address,
        note,
      }),
    {
      onSuccess: ({ data }) => {
        setClientCommandId(data.clientCommandId)
        setCartInfo({})
        setCartItems([])
        setSuccessModalOpen(true)
      },
    }
  )

  if (getAddressMutation.isIdle || getAddressMutation.isLoading)
    return <Spinner />

  if (isCartEmptyModalOpen)
    return (
      <Modal
        isOpen={isCartEmptyModalOpen}
        hideCloseButton={true}
        title="Your cart is still empty!"
        footer={
          <div className="flex justify-end">
            <Button
              label="Go home"
              variant="brand"
              onClick={() => {
                history.push('/')
              }}
            />
          </div>
        }
      ></Modal>
    )

  return (
    <>
      <Modal
        isOpen={isSuccessModalOpen}
        hideCloseButton={true}
        title="Thank you for your order!"
        footer={
          <div className="flex justify-end">
            <Button
              label="Another order"
              variant="success"
              onClick={() => {
                history.push('/')
              }}
            />
          </div>
        }
      >
        <p>Your order number: {clientCommandId}</p>
        <p>
          We'll email you order confirmation with details when your restaurant
          confirms this grouping.
        </p>
      </Modal>

      <div className="flex justify-between">
        <div id="checkout" className="mx-10 mt-5 w-full">
          <div className="text-2xl font-bold mb-5">Checkout</div>
          <div className="border-solid border-2 border-yellow-500 rounded-md p-7 ">
            <div id="delivery-address" className="mt-5">
              <div className="text-base font-bold font-serif ">
                Delivery Address
              </div>
              {deliveryAddressOption === 0 && (
                <>
                  <div className="flex justify-between mt-3">
                    <Input
                      className="w-full"
                      label="Address"
                      required
                      value={address.address || ''}
                      error={
                        submitCommand.isError &&
                        !!submitCommand.error.response.data.errors[
                          'address.address'
                        ]
                      }
                      onChange={(e) =>
                        setAddress({ ...address, address: e.target.value })
                      }
                      placeholder="Please enter your address "
                      type="text"
                    />
                  </div>
                  <div className="flex justify-between mt-3">
                    <CitySearch
                      className="w-1/2 mt-5"
                      label="City"
                      required
                      error={
                        submitCommand.isError &&
                        !!submitCommand.error.response.data.errors[
                          'address.city_id'
                        ]
                      }
                      value={address.city || ''}
                      onChange={(option) =>
                        setAddress({
                          ...address,
                          city: option,
                          city_id: option.id,
                        })
                      }
                    />
                  </div>
                </>
              )}
              {deliveryAddressOption === 1 && (
                <Input
                  className="w-full mt-3"
                  value={address.address || ''}
                  readOnly
                  type="text"
                />
              )}
            </div>
            <div id="personal-info" className="mt-10 mb-5">
              <div className="text-base font-bold font-serif">
                Personal info
              </div>
              <div className="flex justify-between mt-3">
                <Input
                  className="w-1/2"
                  label="Name"
                  value={address.name || ''}
                  required
                  error={
                    submitCommand.isError &&
                    !!submitCommand.error.response.data.errors['address.name']
                  }
                  onChange={(e) =>
                    setAddress({ ...address, name: e.target.value })
                  }
                  placeholder="Please enter your name"
                  type="text"
                />
                <Input
                  label="Wechat"
                  value={address.wechat || ''}
                  onChange={(e) =>
                    setAddress({ ...address, wechat: e.target.value })
                  }
                  className="w-1/2 ml-5"
                  placeholder="Please enter your wechat"
                  type="text"
                />
              </div>
              <Input
                label="Phone"
                required
                value={address.phone || ''}
                error={
                  submitCommand.isError &&
                  !!submitCommand.error.response.data.errors['address.phone']
                }
                onChange={(e) =>
                  setAddress({ ...address, phone: e.target.value })
                }
                className="w-1/2 mt-5"
                placeholder="Please enter your phone"
                type="tel"
              />
            </div>
            <div id="command-note" className="mt-10 mb-5">
              <div className="text-base font-bold font-serif my-5">
                Command note
              </div>
              <Textarea
                rows={4}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Leave your note here"
                style={{ width: '700px' }}
              />
            </div>
            <Button
              className="my-10 w-full"
              variant="brand"
              label="Command"
              isLoading={submitCommand.isLoading}
              onClick={() => submitCommand.mutate()}
            />
          </div>
        </div>
        <div id="cart" className="w-1/3 shadow">
          <Cart showCommandButton={false} />
        </div>
      </div>
    </>
  )
}
export default Checkout
