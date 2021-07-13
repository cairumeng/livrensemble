import { useState } from 'react'
import Card from 'react-rainbow-components/components/Card'
import Input from 'react-rainbow-components/components/Input'
import Button from 'react-rainbow-components/components/Button'
import { FaAt, FaLock } from 'react-icons/fa'

import { useHistory } from 'react-router-dom'
import { useMutation } from 'react-query'
import { useAlert } from 'react-alert'
import axios from 'axios'
import logo from '../../logo.png'

const Register = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState()
  const history = useHistory()
  const alert = useAlert()
  const roleId = 1

  const register = useMutation((info) => axios.post('users', info), {
    onSuccess: () => {
      history.push('/login')
      alert.success('Registration successful! Please login!')
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    register.mutate({
      email,
      password,
      password_confirmation: passwordConfirmation,
      roleId,
    })
  }

  return (
    <div className="grid grid-cols-3 gap-4 mt-24">
      <Card className="col-start-2 p-6 text-center">
        <div>
          <img src={logo} className="w-28 m-auto" alt="logo" />
          <h1 className="font-bold">Sign up</h1>
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
          {register.isError && (
            <div className="text-red-500">
              {register.error.response.data?.errors?.email}
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
          {register.isError && (
            <div className="text-red-500">
              {register.error.response.data?.errors?.password}
            </div>
          )}

          <Input
            icon={<FaLock className="text-yellow-500" />}
            className="mt-3"
            name="password confirmation"
            label="Password Confirmation"
            defaultMessage="Password"
            required
            placeholder="Confirm your password"
            type="password"
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          {register.isError && (
            <div className="text-red-500">
              {register.error.response.data?.errors?.password}
            </div>
          )}

          <Button
            type="submit"
            className="mt-4 w-full"
            variant="brand"
            isLoading={register.isLoading}
            onClick={(e) => handleSubmit(e)}
          >
            <span>Register</span>
          </Button>
        </article>
      </Card>
    </div>
  )
}

export default Register
