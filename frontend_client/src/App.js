import { Switch, Route } from 'react-router-dom'
import Spinner from 'react-rainbow-components/components/Spinner'

import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'
import ResetPassword from './pages/auth/ResetPassword'
import Home from './pages/Home'
import Checkout from './pages/Checkout'
import ClientCommandsList from './pages/ClientCommandsList'

import RestaurantCommandsIndex from './pages/restaurant-commands/Index'
import RestaurantCommandsShow from './pages/restaurant-commands/Show'

import Header from './components/Header'
import useAuth from './context/useAuth'
import AppContextsWrapper from './AppContextsWrapper'
import ProtectedRoute from './components/ProtectedRoute'

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
        <ProtectedRoute
          condition={user}
          path="/checkout"
          exact
          component={Checkout}
          failedRedirectUrl="/login"
        />
        <ProtectedRoute
          condition={user}
          path="/my-commands"
          exact
          component={ClientCommandsList}
          failedRedirectUrl="/login"
        />
        {!user && <Route path="/login" exact component={Login} />}
        {!user && <Route path="/register" exact component={Register} />}
        {!user && (
          <Route path="/password-forgot" exact component={ForgotPassword} />
        )}
        {!user && (
          <Route path="/password-reset" exact component={ResetPassword} />
        )}
        <Route path="*" component={Home} />
      </Switch>
    </>
  )
}
export default AppContextsWrapper(App)
