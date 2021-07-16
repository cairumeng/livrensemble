import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import CitySearch from '../components/CitySearch'

const Home = () => {
  const [, setCity] = useState()
  const history = useHistory()

  const redirectToCity = (city) => {
    setCity(city)
    history.push(`restaurant-commands?cityId=${city.id}`)
  }

  return (
    <div
      className="flex justify-center items-center p-2 flex-col"
      style={{ height: 'calc(100vh - 4rem)' }}
    >
      <h1 className="font-bold text-4xl mb-5">Livrensemble</h1>
      <CitySearch
        onChange={redirectToCity}
        className="w-full sm:w-1/2 lg:w-1/3"
      />
    </div>
  )
}

export default Home
