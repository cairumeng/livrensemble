import { useState } from 'react'
import Card from 'react-rainbow-components/components/Card'
import Input from 'react-rainbow-components/components/Input'
import Button from 'react-rainbow-components/components/Button'
import { Email } from '../../components/icons'
import { useMutation } from 'react-query'
import { useAlert } from 'react-alert'
import axios from 'axios'
import logo from '../../logo.png'
const ForgotPassword = () => {
  const [email, setEmail] = useState()
  const alert = useAlert()
  const forgotPassword = useMutation(
    (data) => axios.post('password/email', data),
    {
      onSuccess: () => {
        alert.success('Reset link has been sent! Please check your email!')
      },
    }
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    forgotPassword.mutate({ email })
  }
  return (
    <div className="grid grid-cols-3 gap-4 mt-24">
      <Card className="col-start-2 p-6 text-center">
        <div>
          <img src={logo} className="w-28 m-auto" alt="logo" />
          <h1 className="font-bold">Forgot password?</h1>
        </div>
        <article className="mt-6">
          <Input
            icon={<Email />}
            name="email"
            label="Email"
            defaultMessage="Email address"
            required
            placeholder="Enter your email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          {forgotPassword.isError && (
            <div className="text-red-500">
              {forgotPassword.error.response?.data?.errors?.email}
            </div>
          )}

          <Button
            type="submit"
            className="mt-4 w-full"
            variant="brand"
            isLoading={forgotPassword.isLoading}
            onClick={handleSubmit}
          >
            <span>Submit</span>
          </Button>
        </article>
      </Card>
    </div>
  )
}
export default ForgotPassword
