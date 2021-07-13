import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import axios from 'axios'
import { QueryClientProvider, QueryClient } from 'react-query'
import { useEffect, useState } from 'react'
import { positions, Provider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'
import Home from './pages/Home'
import RestaurantCommandsIndex from './pages/restaurant-commands/Index'
import RestaurantCommandsShow from './pages/restaurant-commands/Show'
import { AuthContext } from './context/useAuth'
import { CartContextProvider } from './context/useCart'
import Header from './components/Header'

import 'tailwindcss/tailwind.css'
import './App.css'

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
}

function App() {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState('')
  const queryClient = new QueryClient()

  useEffect(() => {
    // const expiresIn = localStorage.getItem('LIVRENSEMBLE_TOKEN_EXPIRED_AT')

    // if (!expiresIn || expiresIn < Date.now()) {
    //   localStorage.removeItem('LIVRENSEMBLE_TOKEN_EXPIRED_AT')
    //   localStorage.removeItem('LIVRENSEMBLE_TOKEN')
    //   return
    // }

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
    <Router>
      <Provider template={AlertTemplate} {...options}>
        <QueryClientProvider client={queryClient}>
          <AuthContext.Provider value={user}>
            <CartContextProvider>
              <Header />
              <Switch>
                <Route path="/" exact component={Home} />
                <Route
                  path="/login"
                  render={() => <Login setToken={setToken} />}
                />
                <Route path="/register" component={Register} />
                <Route path="/password-forgot" component={ForgotPassword} />
                <Route path="/password-reset" component={ResetPassword} />

                <Route
                  path="/restaurant-commands"
                  exact
                  component={RestaurantCommandsIndex}
                />
                <Route
                  path="/restaurant-commands/:id"
                  exact
                  component={RestaurantCommandsShow}
                />
              </Switch>
            </CartContextProvider>
          </AuthContext.Provider>
        </QueryClientProvider>
      </Provider>
    </Router>
  )
}

export default App
