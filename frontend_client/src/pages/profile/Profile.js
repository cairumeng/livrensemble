import ChangeName from './ChangeName'
import ChangePassword from './ChangePassword'

const Profile = () => {
  return (
    <>
      <div className="text-2xl font-bold text-center mt-40">Personal Info</div>

      <div className="grid grid-cols-2 divide-x mx-60 divide-yellow-500 mt-10">
        <div className="pr-20">
          <ChangeName />
        </div>
        <div className="pl-20">
          <ChangePassword />
        </div>
      </div>
    </>
  )
}
export default Profile
