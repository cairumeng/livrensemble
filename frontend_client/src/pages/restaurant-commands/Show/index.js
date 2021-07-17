import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useMutation } from 'react-query'
import AnchorLink from 'react-anchor-link-smooth-scroll'

import Button from 'react-rainbow-components/components/Button'
import Modal from 'react-rainbow-components/components/Modal'
import Tabset from 'react-rainbow-components/components/Tabset'
import Tab from 'react-rainbow-components/components/Tab'

import axios from 'axios'

import CategoryDishes from './CategoryDishes'
import Cart from './Cart'
import useCart from '../../../context/useCart'
import Spinner from 'react-rainbow-components/components/Spinner'

const Show = () => {
  const { id } = useParams()
  const history = useHistory()
  const { cartInfo, cartItems } = useCart()

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

  if (getCommand.isLoading || !command) return <Spinner />

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
              variant="success"
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
        <div className="w-full lg:w-3/4 height-20">
          <div className="bg-gray-50">
            <div
              style={{
                backgroundImage: `url(${avatar})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: 200,
              }}
            />
            <div className="ml-8 mt-5 pb-3">
              <div className="text-2xl font-bold">{name}</div>
              <span>{description}</span>
            </div>
          </div>
          <Tabset
            id="tabset-1"
            className="sticky top-0 bg-yellow-500"
            onSelect={(_, categoryId) => {
              setSelectedCategoryId(categoryId.toString())
            }}
            activeTabName={selectedCategoryId}
          >
            {categories.map((category) => (
              <AnchorLink
                href={`#category-${category.id}`}
                offset={64}
                key={category.id}
                className="no-rainbow"
              >
                <Tab
                  key={category.id}
                  label={category.name}
                  name={category.id.toString()}
                  ariaControls="primaryTab"
                />
              </AnchorLink>
            ))}
          </Tabset>
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
          <Cart
            goBackUrl={isDifferentRestaurant && goBackUrl}
            showCommandButton={cartItems.length > 0}
          />
        </div>
      </div>
    </>
  )
}

export default Show
