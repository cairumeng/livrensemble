import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useMutation } from 'react-query'
import Spinner from 'react-rainbow-components/components/Spinner'
import ProgressBar from 'react-rainbow-components/components/ProgressBar'
import Avatar from 'react-rainbow-components/components/Avatar'
import classNames from 'classnames'
const DELIVERY_OPTION = {
  HOME: 0,
  POSITION: 1,
}
const STATUS = {
  0: 'Grouping',
  1: 'Success',
  2: 'Fail',
  3: 'Canceled',
  4: 'Preparation',
  5: 'Shipped',
  6: 'Arrived',
}

const Show = () => {
  const params = useParams()
  const [clientCommand, setClientCommand] = useState({})
  const [restaurant, setRestaurant] = useState({})
  const [city, setCity] = useState({})
  const [restaurantCommand, setRestaurantCommand] = useState({})
  const [commandDishes, setCommandDishes] = useState([])
  const [shippingAddress, setShippingAddress] = useState({})
  const [users, setUsers] = useState([])

  const getClientCommandMutation = useMutation(
    () => axios.get(`client-commands/${params.id}`),
    {
      onSuccess: ({ data }) => {
        setClientCommand(data.client_command.client_command)
        setRestaurant(data.client_command.restaurant)
        setCity(data.client_command.city)
        setRestaurantCommand(data.client_command.restaurant_command)
        setCommandDishes(data.client_command_dishes)
        setShippingAddress(data.client_command.shipping_address)
        setUsers(data.users)
      },
    }
  )

  useEffect(() => getClientCommandMutation.mutate(), [])
  if (getClientCommandMutation.isLodading) return <Spinner />

  const progressBarPercentage = (
    (restaurantCommand.current_price / restaurantCommand.target_price) *
    100
  ).toFixed(1)

  return (
    <div className="md:flex">
      <div className="my-auto px-5 md:px-6 md:w-2/3 lg:px-8 pt-20 text-center">
        <div id="command" className="bg-gray-50">
          <div
            style={{
              backgroundImage: `url(${restaurant.avatar})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              height: 200,
            }}
          />
          <div className="mt-5 pb-3 text-center">
            <div className="text-2xl font-bold">{restaurant.name}</div>
            <span>{restaurant.description}</span>
          </div>

          <div className="text-base mt-5 text-left">
            <span className="text-lg font-bold mr-5">
              Restaurant Command #:
            </span>
            {restaurantCommand.id}
          </div>

          <div className="text-base text-left">
            <span className="text-lg font-bold mr-5 ">Start Date:</span>
            {restaurantCommand.started_at}
          </div>

          <div className="text-base text-left">
            <span className="text-lg font-bold mr-5 ">End Date:</span>
            {restaurantCommand.ended_at}
          </div>

          <div className="text-base text-left">
            <span className="text-lg font-bold mr-5">Delivery Date:</span>
            {restaurantCommand.delivery_date}
          </div>

          <div
            className={classNames('text-base text-left mb-10', {
              'text-red-500':
                STATUS[restaurantCommand.status] == 'Fail' ||
                STATUS[restaurantCommand.status] == 'Canceled',
            })}
          >
            <span className="text-lg font-bold mr-5">Status:</span>
            {STATUS[restaurantCommand.status]}
          </div>

          <div className="flex justify-between ">
            <div className="font-bold">Grouping progress</div>
            <div aria-hidden="true">
              <strong className="text-yellow-500">
                {progressBarPercentage}% Complete
              </strong>
            </div>
          </div>
          <ProgressBar
            value={progressBarPercentage}
            size="large"
            className="mt-2"
          />
        </div>
        <div className="mt-16">
          <div className="text-lg font-bold text-left">Command Dishes</div>
          <table className="mt-5 table-auto">
            <thead>
              <tr className="text-base">
                <th>#</th>
                <th>Avatar</th>
                <th>Name</th>
                <th>quantity</th>
              </tr>
            </thead>
            <tbody>
              {commandDishes.map((dishItem) => (
                <tr className="h-20 font-semibold" key={dishItem.id}>
                  <td>{dishItem.dish_id}</td>
                  <td>
                    <img src={dishItem.dish.avatar} className="w-16 h-16" />
                  </td>
                  <td>{dishItem.dish.name}</td>
                  <td>{dishItem.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="font-bold text-base mt-5 text-left">
            <span className="text-lg font-bold mr-5">Note:</span>
            {clientCommand.note}
          </div>
        </div>
      </div>
      <div className="mt-10 px-5 pb-20">
        <div className="text-base mt-5 text-left">
          <span className="text-lg font-bold mr-5 ">Command #:</span>
          {clientCommand.id}
        </div>
        <div className="text-base">
          <span className="text-lg font-bold mr-5">Order date:</span>
          {clientCommand.created_at}

          {/* {format(parseISO(clientCommand.created_at), 'MM/dd/yyyy')} */}
        </div>
        <div className="text-base text-left">
          <span className="text-lg font-bold mr-5">Receiver:</span>
          {shippingAddress.name}
        </div>

        <div className="text-base">
          <span className="text-lg font-bold mr-5">Shipping Address:</span>
          {restaurantCommand.delivery_address_option ==
            DELIVERY_OPTION['HOME'] && (
            <div>
              {shippingAddress.address},{shippingAddress.city?.postal_code},
              {shippingAddress.city?.name}
            </div>
          )}
          {restaurantCommand.delivery_address_option ==
            DELIVERY_OPTION['POSITION'] && (
            <div>{restaurantCommand?.delivery_address}</div>
          )}
        </div>
        <div className="text-base text-left">
          <span className="text-lg font-bold mr-5">Phone:</span>
          {shippingAddress.phone}
        </div>
        <div className="mt-10">
          <div className="text-lg font-bold ">Participants:</div>
          <div className="flex mt-3">
            {users.length > 0 &&
              users.map((user) => (
                <Avatar src={user.user.avatar} size="medium" />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Show
