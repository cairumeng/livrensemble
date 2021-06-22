import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Login from './pages/Login'
import 'tailwindcss/tailwind.css'
import { UserContext } from './context/useAccount'
import { QueryClientProvider, QueryClient } from 'react-query'
import './App.css'
import { useEffect, useState } from 'react'
import axios from 'axios'

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
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider user={user}>
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </ul>
            </nav>

            <Switch>
              <Route
                path="/login"
                render={() => <Login setToken={setToken} />}
              />
            </Switch>
          </div>
        </Router>
      </UserContext.Provider>
    </QueryClientProvider>
  )
}

export default App
