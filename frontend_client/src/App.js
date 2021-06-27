import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'
import Index from './pages/Index'

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
    const localToken = localStorage.getItem('LIVRENSEMBLE_TOKEN')
    if (localToken) setToken(localToken)
  }, [])

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = token
    if (token) {
      axios.post('auth/me').then(({ data }) => {
        setUser(data)
      })
    }
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
            </Switch>
          </Router>
        </AccountContext.Provider>
      </QueryClientProvider>
    </Provider>
  )
}

export default App
