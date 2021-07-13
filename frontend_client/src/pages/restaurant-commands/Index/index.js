import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
import { useMutation } from 'react-query'
import Pagination from 'react-rainbow-components/components/Pagination'

import Carousel from './Carousel'
import CommandItem from './CommandItem'
import CommandLoadingShape from './CommandLoadingShape'

const Index = () => {
  const [city, setCity] = useState()
  const [commands, setCommands] = useState([])
  const [activePage, setActivePage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)

  const location = useLocation()
  const cityId = new URLSearchParams(location.search).get('cityId')

  const changePageHandler = (_, page) => {
    setActivePage(page)
  }

  const getCommands = useMutation(
    () => axios.get(`restaurant-commands?cityId=${cityId}&page=${activePage}`),
    {
      onSuccess: ({ data }) => {
        setCommands(data.commands.data)
        setCity(data.city)
        setTotalPage(data.commands.last_page)
      },
    }
  )

  useEffect(() => {
    getCommands.mutate()
  }, [activePage])

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 mt-7 text-center ">
      <Carousel />
      <span className="inline-block text-2xl font-extrabold text-gray-900 tracking-tight mt-5 mb-5">
        {city && `${city.name}-${city.postal_code}`}
      </span>

      {getCommands.isLoading ? (
        <CommandLoadingShape />
      ) : (
        commands.map((command) => (
          <CommandItem key={command.id} command={command} />
        ))
      )}

      <Pagination
        className="mx-auto"
        pages={totalPage}
        activePage={activePage}
        onChange={changePageHandler}
      />
    </div>
  )
}

export default Index
