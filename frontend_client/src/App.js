import { Switch, Route } from 'react-router-dom'
import Spinner from 'react-rainbow-components/components/Spinner'

import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'
import Home from './pages/Home'
import Checkout from './pages/Checkout'

import RestaurantCommandsIndex from './pages/restaurant-commands/Index'
import RestaurantCommandsShow from './pages/restaurant-commands/Show'

import Header from './components/Header'
import useAuth from './context/useAuth'
import AppContextsWrapper from './AppContextsWrapper'

import 'tailwindcss/tailwind.css'
import './App.css'

function App() {
  const { user, getProfileMutation, getLocalToken } = useAuth()
  if (
    getLocalToken() &&
    (getProfileMutation.isIdle || getProfileMutation.isLoading)
  )
    return <Spinner />

  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />

        {!user && (
          <>
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/password-forgot" exact component={ForgotPassword} />
            <Route path="/password-reset" exact component={ResetPassword} />
          </>
        )}

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
export default AppContextsWrapper(App)
