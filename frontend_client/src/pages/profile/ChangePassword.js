import useAuth from '../../context/useAuth'
import Input from 'react-rainbow-components/components/Input'
import Button from 'react-rainbow-components/components/Button'
import Modal from 'react-rainbow-components/components/Modal'
import { useState } from 'react'
import axios from 'axios'
import { useMutation } from 'react-query'

const ChangePassword = () => {
  const { user } = useAuth()
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false)
  const [currentPassword, setCurrentPassword] = useState(null)
  const [newPassword, setNewPassword] = useState(null)
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState(null)

  const changePasswordMutation = useMutation(
    () =>
      axios.put(`/users/${user.id}/change-password`, {
        current_password: currentPassword,
        new_password: newPassword,
        new_password_confirmation: newPasswordConfirmation,
      }),
    {
      onSuccess: ({ data }) => {
        if (data === 1) {
          setSuccessModalOpen(true)
        }
      },
    }
  )
  const changePasswordHandler = () => {
    changePasswordMutation.mutate()
  }

  return (
    <>
      <Modal
        isOpen={isSuccessModalOpen}
        hideCloseButton={true}
        title="You have modified your password!"
        footer={
          <div className="flex justify-end">
            <Button
              label="I get it"
              variant="success"
              onClick={() => {
                setSuccessModalOpen(false)
              }}
            />
          </div>
        }
      />
      <article className="mt-6">
        <Input
          name="current-password"
          label="Current password"
          type="password"
          className="mb-3"
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        {changePasswordMutation.isError && (
          <div className="text-red-500">
            {changePasswordMutation.error.response.data.errors.current_password}
          </div>
        )}

        <Input
          name="new-password"
          label="New password"
          type="password"
          className="mb-3"
          onChange={(e) => setNewPassword(e.target.value)}
        />
        {changePasswordMutation.isError && (
          <div className="text-red-500">
            {changePasswordMutation.error.response.data.errors.new_password}
          </div>
        )}
        <Input
          name="new-password-confirmation"
          label="Confirm new password"
          type="password"
          className="mb-3"
          onChange={(e) => setNewPasswordConfirmation(e.target.value)}
        />

        <Button
          type="submit"
          className="mt-4 w-full"
          variant="success"
          onClick={changePasswordHandler}
          isLoading={changePasswordMutation.isLoading}
        >
          <span>Modify</span>
        </Button>
      </article>
    </>
  )
}
export default ChangePassword
