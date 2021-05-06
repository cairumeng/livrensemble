import React from 'react'
import Card from 'react-rainbow-components/components/Card'
import Input from 'react-rainbow-components/components/Input'
import Button from 'react-rainbow-components/components/Button'
import { Email, Lock } from '../components/icons'
import { Link } from 'react-router-dom'
import logo from '../logo.png'

const SignForm = () => {
  const handleSubmit = () => {}

  const reset = () => {}

  return (
    <div className="grid grid-cols-3 gap-4 mt-24">
      <Card className="col-start-2 p-6 text-center">
        <form>
          <div>
            <img src={logo} className="w-28 m-auto" alt="logo" />

            <h1 className="font-bold">Sign in</h1>
            <div className="flex text-xs justify-center mt-2 mb-3">
              <p className="mr-2">Don’t have an account?</p>
              <Link className="text-blue-400">Create Account</Link>
            </div>
          </div>
          <article>
            <Input
              icon={<Email />}
              name="email"
              label="Email"
              defaultMessage="Email address"
              required
              placeholder="Enter your email"
              type="email"
            />
            <Input
              icon={<Lock />}
              className="mt-3"
              name="password"
              label="Password"
              defaultMessage="Password"
              required
              placeholder="Enter your password"
              type="password"
            />
            <Button
              type="submit"
              className="mt-4 w-full"
              variant="brand"
              isLoading={false}
              onClick={handleSubmit}
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
              <Link>Forgot your password?</Link>
            </div>
          </article>
        </form>
      </Card>
    </div>
  )
}

export default SignForm
