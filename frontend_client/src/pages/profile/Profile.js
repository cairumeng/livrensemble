import ChangeName from './ChangeName'
import ChangePassword from './ChangePassword'

const Profile = () => {
  return (
    <>
      <div className="text-2xl font-bold text-center pt-20 md:pt-36">
        Personal Info
      </div>
      <div className="divide-y mt-10 divide-yellow-500 md:grid md:grid-cols-2 md:divide-x md:divide-y-0 md:mx-60  ">
        <div className="px-12 md:pr-20 ">
          <ChangeName />
        </div>
        <div className="mt-10 md:mt-0 pb-20 px-12 md:pl-20">
          <ChangePassword />
        </div>
      </div>
    </>
  )
}
export default Profile
