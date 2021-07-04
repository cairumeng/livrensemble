import Card from 'react-rainbow-components/components/Card'
import { Link } from 'react-router-dom'
const DELIVERY_OPTION = {
  HOME: 0,
  POSITION: 1,
}
const CommandItem = ({ command }) => {
  return (
    <Card className="relative mb-3 block px-3 py-5">
      <Link className="flex items-start no-underline hover:no-underline">
        <div className="w-full flex items-stretch justify-between sm:justify-items-start sm:flex-col">
          <div className="flex pr-5 md:pr-4 sm:w-full pr-0">
            <img
              className="w-36 h-36 transition-all duration-200 ease-in-out"
              src={command.restaurant.avatar}
            />
            <div className="ml-6">
              <div className="text-left relative -top-0.5 mt-0 mb-2.5 transition-all duration-200 ease-in-out text-lg leading-snug font-bold">
                {command.restaurant.name}
              </div>

              <div className="mb-2 text-base leading-none text-left">
                {command.restaurant.description}
              </div>

              <div className="mb-2 text-base leading-none text-left">
                End at: {command.ended_at}
              </div>

              <div className="mb-2 text-base leading-none text-left">
                Delivery date: {command.delivery_date}
              </div>

              <div className="mb-2 text-base leading-none text-left">
                Delivery Address:{' '}
                {command.delivery_address_option === DELIVERY_OPTION.HOME
                  ? 'HOME'
                  : command.delivery_address}
              </div>
            </div>
          </div>
          {/* <div className="flex flex-col flex-shrink justify-between items-end text-right sm:w-full sm:items-center sm:text-center">
            <ItemRating
              averageRating={Math.round(Number(averageRating))}
              ratingCount={ratingCount}
            />
          </div> */}
        </div>
      </Link>
    </Card>
  )
}
export default CommandItem
