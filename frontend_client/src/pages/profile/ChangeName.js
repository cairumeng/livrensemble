import useAuth from '../../context/useAuth'
import Input from 'react-rainbow-components/components/Input'
import Button from 'react-rainbow-components/components/Button'
import Modal from 'react-rainbow-components/components/Modal'
import { useState } from 'react'
import axios from 'axios'
import { useMutation } from 'react-query'
const ChangeName = () => {
  const { user } = useAuth()
  const [avatar, setAvatar] = useState(user.avatar)
  const [name, setName] = useState(user.name)
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false)

  const uploadImageHandler = (e) => {
    var avatar = e.target.files[0]
    var formData = new FormData()
    formData.append('avatar', avatar)
    axios.post(`/users/${user.id}/upload-avatar`, formData).then(({ data }) => {
      setAvatar(data)
    })
  }
  const changeNameMutation = useMutation(
    () => axios.put(`/users/${user.id}/name`, { name }),
    {
      onSuccess: ({ data }) => {
        if (data === 1) {
          setSuccessModalOpen(true)
        }
      },
    }
  )
  const changeNameHandler = () => {
    changeNameMutation.mutate()
  }

  return (
    <>
      <Modal
        isOpen={isSuccessModalOpen}
        hideCloseButton={true}
        title="You have modified your information!"
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
      <article className="mt-5">
        <img
          src={avatar}
          className="w-20 h-20 mx-auto mb-6 rounded-full  "
          onClick={() => document.getElementById('avatar').click()}
        />
        <input type="file" id="avatar" hidden onChange={uploadImageHandler} />

        <Input
          name="name"
          label="Name"
          value={name}
          className="mb-3"
          onChange={(e) => setName(e.target.value)}
        />
        {changeNameMutation.isError && (
          <div className="text-red-500">
            {changeNameMutation.error.response.data.errors.name}
          </div>
        )}
        <Input name="email" label="Email" value={user.email} disabled />

        <Button
          type="submit"
          className="mt-4 w-full"
          variant="success"
          onClick={changeNameHandler}
          isLoading={changeNameMutation.isLoading}
        >
          <span>Modify</span>
        </Button>
      </article>
    </>
  )
}
export default ChangeName
