import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import 'tailwindcss/tailwind.css'
import { UserContext } from './context/useAccount'
import { QueryClientProvider, QueryClient } from 'react-query'
import './App.css'
import { useEffect, useState } from 'react'
import { positions, Provider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import axios from 'axios'
const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
}

function App() {
  const [user, setUser] = useState({})
  const [token, setToken] = useState('')
  const queryClient = new QueryClient()

  // const localToken = localStorage.getItem('LIVRENSEMBLE_TOKEN')
  // if (localToken) setToken(localToken)

  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = token
    if (token) {
      axios.post('auth/me').then((data) => {
        setUser(data)
      })
    }
  }, [token])

  return (
    <Provider template={AlertTemplate} {...options}>
      <QueryClientProvider client={queryClient}>
        <UserContext.Provider user={user}>
          <Router>
            <div>
              <nav>
                <ul>
                  <li>
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/register">Register</Link>
                  </li>
                </ul>
              </nav>

              <Switch>
                <Route
                  path="/login"
                  render={() => <Login setToken={setToken} />}
                />
                <Route path="/register" render={() => <Register />} />
              </Switch>
            </div>
          </Router>
        </UserContext.Provider>
      </QueryClientProvider>
    </Provider>
  )
}

export default App
