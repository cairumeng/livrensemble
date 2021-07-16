import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query'
import { positions, Provider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'

import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'
import Home from './pages/Home'
import Checkout from './pages/Checkout'

import RestaurantCommandsIndex from './pages/restaurant-commands/Index'
import RestaurantCommandsShow from './pages/restaurant-commands/Show'

import Header from './components/Header'

import useAuth, { AuthContextProvider } from './context/useAuth'
import { CartContextProvider } from './context/useCart'

import 'tailwindcss/tailwind.css'
import './App.css'

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
}

function App() {
  const { user } = useAuth()
  return (
    <>
      <Header />
      <Switch>
        {!user && (
          <>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/password-forgot" component={ForgotPassword} />
            <Route path="/password-reset" component={ResetPassword} />
          </>
        )}
        <Route path="/" exact component={Home} />

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
        {user && (
          <>
            <Route path="/checkout" exact component={Checkout} />
          </>
        )}
      </Switch>
    </>
  )
}

const AppContextsWrapper = (App) => () => {
  const queryClient = new QueryClient()
  return (
    <Router>
      <Provider template={AlertTemplate} {...options}>
        <QueryClientProvider client={queryClient}>
          <AuthContextProvider>
            <CartContextProvider>
              <App />
            </CartContextProvider>
          </AuthContextProvider>
        </QueryClientProvider>
      </Provider>
    </Router>
  )
}

export default AppContextsWrapper(App)
