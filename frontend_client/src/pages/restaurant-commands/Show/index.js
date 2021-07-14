import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useMutation } from 'react-query'

import Button from 'react-rainbow-components/components/Button'
import Modal from 'react-rainbow-components/components/Modal'
import Tabset from 'react-rainbow-components/components/Tabset'
import Tab from 'react-rainbow-components/components/Tab'

import axios from 'axios'

import CategoryDishes from './CategoryDishes'
import Cart from './Cart'
import useCart from '../../../context/useCart'

const Show = () => {
  const { id } = useParams()
  const history = useHistory()
  const { cartInfo } = useCart()

  const [command, setCommand] = useState(null)
  const [restaurant, setRestaurant] = useState(null)
  const [categories, setCategories] = useState([])
  const [selectedCategoryId, setSelectedCategoryId] = useState('0')
  const [isCartModalOpen, setCartModalOpen] = useState(false)

  useEffect(() => {
    getCommand.mutate()
    getCategories.mutate()
  }, [id])

  useEffect(() => {
    if (cartInfo.commandId) {
      setCartModalOpen(cartInfo.commandId != id)
    }
  }, [cartInfo.commandId, id])

  const getCommand = useMutation(
    () => axios.get(`/restaurant-commands/${id}`),
    {
      onSuccess: ({ data }) => {
        setCommand(data.command)
        setRestaurant(data.restaurant)
      },
    }
  )
  const getCategories = useMutation(
    () => axios.get(`/dish-categories?commandId=${id}`),
    {
      onSuccess: ({ data }) => {
        setCategories(data.categories)
      },
    }
  )

  if (getCommand.isLoading || !command) return <div>Loading</div>

  const isDifferentRestaurant = cartInfo.commandId && cartInfo.commandId != id

  const goBackUrl = `/restaurant-commands/${cartInfo.commandId}`
  const { avatar, name, description } = restaurant

  return (
    <>
      <Modal
        isOpen={isCartModalOpen}
        onRequestClose={() => setCartModalOpen(false)}
        title="Warning"
        footer={
          <div className="flex justify-end">
            <Button
              label="Get it"
              variant="neutral"
              onClick={() => setCartModalOpen(false)}
            />

            <Button
              className="ml-2"
              variant="brand"
              label="Go back"
              onClick={() => history.push(goBackUrl)}
            />
          </div>
        }
      >
        <p>You have an uncompleted command in another restaurant.</p>
        <p>An operation in the new restaurant will clear the previous cart.</p>
        <p>How would you like to deal with your previous cart?</p>
      </Modal>
      <div className="flex justify-between">
        <div className="w-full height-20">
          <div className="bg-gray-50">
            <div
              style={{
                backgroundImage: `url(${avatar})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: 200,
              }}
            />
            <div className="ml-8 mt-5 mb-3">
              <div className="text-2xl font-bold">{name}</div>
              <span>{description}</span>
            </div>
            <Tabset
              id="tabset-1"
              onSelect={(_, categoryId) => {
                setSelectedCategoryId(categoryId.toString())
              }}
              activeTabName={selectedCategoryId}
            >
              {categories.map((category) => (
                <Tab
                  key={category.id}
                  label={category.name}
                  name={category.id.toString()}
                  ariaControls="primaryTab"
                />
              ))}
            </Tabset>
          </div>
          <div>
            {getCategories.isLoading ? (
              <div>Loading</div>
            ) : (
              categories.map((category) => (
                <CategoryDishes category={category} key={category.id} />
              ))
            )}
          </div>
        </div>

        <div className="w-1/3 shadow">
          <Cart goBackUrl={isDifferentRestaurant && goBackUrl} />
        </div>
      </div>
    </>
  )
}

export default Show
