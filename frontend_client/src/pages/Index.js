import axios from 'axios'
import React, { useState } from 'react'
import { useMutation } from 'react-query'
import Lookup from 'react-rainbow-components/components/Lookup'
import { useHistory } from 'react-router-dom'

const Index = () => {
  const [_, setCity] = useState()
  const [options, setOptions] = useState(null)
  const history = useHistory()

  const searchMutation = useMutation(
    (searchValue) => axios.get(`cities?search=${searchValue}`),
    {
      onSuccess: ({ data }) => {
        const cityOptions = data.map((city) => ({
          label: `${city.name}, ${city.postal_code}`,
          id: city.id,
        }))
        setOptions(cityOptions)
      },
    }
  )

  const search = (value) => {
    const trimedValue = value?.trim()
    if (trimedValue.length < 1) return

    searchMutation.mutate(trimedValue)
  }

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
      <Lookup
        placeholder="Enter your city name or postal code"
        options={options}
        debounce
        isLoading={searchMutation.isLoading}
        onChange={(city) => redirectToCity(city)}
        onSearch={search}
        className="w-full sm:w-1/2 lg:w-1/3"
      />
    </div>
  )
}

export default Index
