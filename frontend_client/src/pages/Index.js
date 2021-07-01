import axios from 'axios'
import React, { useState } from 'react'

import Lookup from 'react-rainbow-components/components/Lookup'
import { useHistory } from 'react-router-dom'

const Index = () => {
  const [city, setCity] = useState(null)
  const [options, setOptions] = useState([])
  const history = useHistory()

  const search = (value) => {
    const trimedValue = value?.trim()
    if (trimedValue.length < 1) return

    axios.get(`cities?search=${trimedValue}`).then((response) => {
      const cityOptions = response.data.map((city) => ({
        label: `${city.name}, ${city.postal_code}`,
        id: city.id,
      }))
      setOptions(cityOptions)
    })
  }

  const getCityCommandsHandler = (option) => {
    setCity(option)
    history.push(`restaurant-commands?cityId=${option.id}`)
  }

  return (
    <div
      className="flex justify-center items-center p-2 flex-col"
      style={{ height: 'calc(100vh - 4rem)' }}
    >
      <h1 className="font-bold text-4xl mb-5">Livrensemble</h1>
      <Lookup
        placeholder="Enter your city name or postal code"
        options={options}
        debounce
        value={city}
        onChange={(option) => getCityCommandsHandler(option)}
        onSearch={search}
        className="w-full sm:w-1/2 lg:w-1/3"
      />
    </div>
  )
}
export default Index
