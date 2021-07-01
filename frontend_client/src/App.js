import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'
import Index from './pages/Index'
import RestaurantCommandsIndex from './pages/restaurant-commands/Index'

import 'tailwindcss/tailwind.css'
import { AccountContext } from './context/useAccount'
import { QueryClientProvider, QueryClient } from 'react-query'
import './App.css'
import { useEffect, useState } from 'react'
import { positions, Provider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import axios from 'axios'
import Header from './components/Header'

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
}

function App() {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState('')
  const queryClient = new QueryClient()

  useEffect(() => {
    const expiresIn = localStorage.getItem('LIVRENSEMBLE_TOKEN_EXPIRED_AT')
    if (!expiresIn || expiresIn < Date.now()) return

    const localToken = localStorage.getItem('LIVRENSEMBLE_TOKEN')
    if (localToken) setToken(localToken)
  }, [])

  useEffect(() => {
    if (!token) return

    axios.defaults.headers.common['Authorization'] = token
    axios.post('auth/me').then(({ data }) => {
      setUser(data)
    })
  }, [token])

  return (
    <Provider template={AlertTemplate} {...options}>
      <QueryClientProvider client={queryClient}>
        <AccountContext.Provider value={user}>
          <Router>
            <Header />
            <Switch>
              <Route path="/" exact render={() => <Index />} />

              <Route
                path="/login"
                render={() => <Login setToken={setToken} />}
              />
              <Route path="/register" render={() => <Register />} />
              <Route
                path="/password-forgot"
                render={() => <ForgotPassword />}
              />
              <Route path="/password-reset" render={() => <ResetPassword />} />
              <Route
                path="/restaurant-commands"
                render={() => <RestaurantCommandsIndex />}
              />
            </Switch>
          </Router>
        </AccountContext.Provider>
      </QueryClientProvider>
    </Provider>
  )
}

export default App
