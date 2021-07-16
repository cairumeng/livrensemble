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

const Checkout = () => {
  const [initialAddress, setInitialAddress] = useState({})
  const [address, setAddress] = useState({})
  const [note, setNote] = useState()
  const { setCartInfo, setCartItems } = useCart()
  const [isModalOpen, setModalOpen] = useState(false)
  const [clientCommandId, setClientCommandId] = useState(null)
  const history = useHistory()

  useEffect(() => {
    axios.get('/addresses').then(({ data }) => {
      const address = {
        ...data,
        city: {
          label: `${data.city.name}, ${data.city.postal_code}`,
          id: data.city.id,
        },
      }
      setAddress(address)
      setInitialAddress(address)
    })
  }, [])

  const submitCommand = useMutation(
    () =>
      axios.post('/client-commands', {
        isAddressUpdated:
          JSON.stringify(address) === JSON.stringify(initialAddress),
        address,
        note,
      }),
    {
      onSuccess: ({ data }) => {
        setClientCommandId(data.clientCommandId)
        setCartInfo({})
        setCartItems([])
        setModalOpen(true)
      },
    }
  )

  return (
    <>
      <Modal
        isOpen={isModalOpen}
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
          <div className="text-2xl font-bold mb-5">Payment</div>
          <div className="border-solid border-2 border-yellow-500 rounded-md p-7 ">
            <div id="delivery-address" className="mt-5">
              <div className="text-base font-bold font-serif ">
                Delivery Address
              </div>
              <div className="flex justify-between mt-3">
                <Input
                  className="w-full"
                  label="Address"
                  value={address.address}
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
                  value={address.city || ''}
                  onChange={(option) =>
                    setAddress({ ...address, city: option })
                  }
                />
              </div>
            </div>
            <div id="personal-info" className="mt-10 mb-5">
              <div className="text-base font-bold font-serif">
                Personal info
              </div>
              <div className="flex justify-between mt-3">
                <Input
                  className="w-1/2"
                  label="Name"
                  value={address.name}
                  onChange={(e) =>
                    setAddress({ ...address, name: e.target.value })
                  }
                  placeholder="Please enter your name"
                  type="text"
                />
                <Input
                  label="Wechat"
                  value={address.wechat}
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
                value={address.phone}
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
