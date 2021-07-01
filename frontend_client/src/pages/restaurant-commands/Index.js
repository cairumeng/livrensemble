import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Command from './components/Command'
import { useLocation } from 'react-router-dom'

const Index = () => {
  const [city, setCity] = useState()
  const [commands, setCommands] = useState([])

  const location = useLocation()
  const cityId = new URLSearchParams(location.search).get('cityId')

  useEffect(() => {
    axios.get(`restaurant-commands?cityId=${cityId}`).then((response) => {
      setCommands(response.data.commands)
      setCity(response.data.city)
    })
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 mt-7">
      {commands.map((command) => (
        <Command key={command.id} command={command} />
      ))}
    </div>
  )
}

export default Index
