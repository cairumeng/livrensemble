import axios from 'axios'
import { useState } from 'react'
import { useMutation } from 'react-query'
import Lookup from 'react-rainbow-components/components/Lookup'

const CitySearch = ({ onChange, className, ...props }) => {
  const [options, setOptions] = useState(null)
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

  return (
    <Lookup
      placeholder="Enter your city name or postal code"
      options={options}
      debounce
      isLoading={searchMutation.isLoading}
      onChange={onChange}
      onSearch={search}
      className={className}
      {...props}
    />
  )
}
export default CitySearch
