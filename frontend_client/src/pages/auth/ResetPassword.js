import { useState } from 'react'
import Card from 'react-rainbow-components/components/Card'
import Input from 'react-rainbow-components/components/Input'
import Button from 'react-rainbow-components/components/Button'
import { Lock } from '../../components/icons'
import { useMutation } from 'react-query'
import { useHistory, useLocation } from 'react-router-dom'
import { useAlert } from 'react-alert'
import axios from 'axios'
import logo from '../../logo.png'
const ResetPassword = () => {
  const [password, setPassword] = useState()
  const [passwordConfirmation, setPasswordConfirmation] = useState()
  const search = useLocation().search
  const email = new URLSearchParams(search).get('email')
  const token = new URLSearchParams(search).get('token')
  const alert = useAlert()
  const history = useHistory()

  const resetPassword = useMutation(
    (data) => axios.post('password/reset', data),
    {
      onSuccess: () => {
        history.push('/login')
        alert.success('Reset sucessfully! Please log in!')
      },
    }
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    resetPassword.mutate({
      password,
      password_confirmation: passwordConfirmation,
      email,
      token,
    })
  }
  return (
    <div className="grid grid-cols-3 gap-4 mt-24">
      <Card className="col-start-2 p-6 text-center">
        <div>
          <img src={logo} className="w-28 m-auto" alt="logo" />
          <h1 className="font-bold">Reset password</h1>
        </div>
        <article className="mt-6">
          <Input
            icon={<Lock />}
            className="mt-3"
            name="password"
            label="Password"
            defaultMessage="Password"
            required
            placeholder="Enter your new password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          {resetPassword.isError && (
            <div className="text-red-500">
              {resetPassword.error.response.data?.errors?.password}
            </div>
          )}

          <Input
            icon={<Lock />}
            className="mt-3"
            name="password confirmation"
            label="Password Confirmation"
            defaultMessage="Password"
            required
            placeholder="Confirm your password"
            type="password"
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          {resetPassword.isError && (
            <div className="text-red-500">
              {resetPassword.error.response.data?.errors?.password}
            </div>
          )}

          <Button
            type="submit"
            className="mt-4 w-full"
            variant="success"
            isLoading={resetPassword.isLoading}
            onClick={(e) => handleSubmit(e)}
          >
            <span>Reset</span>
          </Button>
        </article>
      </Card>
    </div>
  )
}
export default ResetPassword
