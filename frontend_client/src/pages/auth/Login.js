import { useState } from 'react'
import Card from 'react-rainbow-components/components/Card'
import Input from 'react-rainbow-components/components/Input'
import Button from 'react-rainbow-components/components/Button'
import { FaLock, FaAt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useMutation } from 'react-query'
import axios from 'axios'
import logo from '../../logo.png'

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const login = useMutation(
    ({ email, password }) => axios.post('auth/login', { email, password }),
    {
      onSuccess: ({ data }) => {
        const token = `Bearer ${data.access_token}`
        setToken(token)
        localStorage.setItem('LIVRENSEMBLE_TOKEN', token)
        localStorage.setItem(
          'LIVRENSEMBLE_TOKEN_EXPIRED_AT',
          Date.now() + data.expires_in - 60
        )
      },
    }
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    login.mutate({ email, password })
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-8 2xl:grid-cols-5 gap-4 mt-24 p-4">
      <Card className="sm:col-start-3 sm:col-span-4 2xl:col-start-3 2xl:col-span-1 p-6 text-center">
        <div>
          <img src={logo} className="w-28 m-auto" alt="logo" />
          <h1 className="font-bold">Log in</h1>
          <div className="flex text-xs justify-center mt-2 mb-3">
            <p className="mr-2">Don’t have an account?</p>
            <Link className="text-blue-400" to="/register">
              Create Account
            </Link>
          </div>
        </div>
        <article className="mt-6">
          <Input
            icon={<FaAt className="text-yellow-500" />}
            name="email"
            label="Email"
            defaultMessage="Email address"
            required
            placeholder="Enter your email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {login.isError && (
            <div className="text-red-500">
              {login.error.response.data.errors.email}
            </div>
          )}
          <Input
            icon={<FaLock className="text-yellow-500" />}
            className="mt-3"
            name="password"
            label="Password"
            defaultMessage="Password"
            required
            placeholder="Enter your password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {login.isError && (
            <div className="text-red-500">
              {login.error.response.data.errors.password}
            </div>
          )}
          <Button
            type="submit"
            className="mt-4 w-full"
            variant="brand"
            isLoading={login.isLoading}
            onClick={(e) => handleSubmit(e)}
          >
            <span>Login</span>
          </Button>
          <Input
            name="remember"
            type="checkbox"
            label="Remember me"
            className="mt-3 text-sm text-left"
          />
          <div className="mt-4 text-sm text-blue-400">
            <Link to="/password-forgot">Forgot your password?</Link>
          </div>
        </article>
      </Card>
    </div>
  )
}

export default Login
