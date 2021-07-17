import Card from 'react-rainbow-components/components/Card'
import { FaCalendarAlt, FaMotorcycle, FaMapMarkerAlt } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'
import { format, parseISO } from 'date-fns'
const DELIVERY_OPTION = {
  HOME: 0,
  POSITION: 1,
}

const CommandItem = ({ command }) => {
  const history = useHistory()
  return (
    <Card className="relative mb-3 block px-3 py-5 cursor-pointer">
      <div
        className="w-full flex items-stretch justify-between sm:justify-items-start sm:flex-col"
        onClick={() => history.push(`restaurant-commands/${command.id}`)}
      >
        <div className="flex pr-5 md:pr-4 sm:w-full pr-0">
          <img
            alt={command.restaurant.name}
            className="w-36 h-36 transition-all duration-200 ease-in-out"
            src={command.restaurant.avatar}
          />
          <div className="ml-6 flex flex-col justify-between">
            <div>
              <div className="text-left relative -top-0.5 mt-0 mb-2.5 transition-all duration-200 ease-in-out text-lg leading-snug font-bold">
                {command.restaurant.name}
              </div>

              <div className="mb-2 text-base leading-none text-left">
                {command.restaurant.description}
              </div>
            </div>
            <div className=" mt-5">
              <div className="flex mb-2 text-base leading-none text-left">
                <FaCalendarAlt className="mr-1" />
                <div>{format(parseISO(command.ended_at), 'MM/dd/yyyy')}</div>
              </div>
              <div className="flex mb-2 text-base leading-none text-left">
                <FaMotorcycle className="text-xl mr-1" />
                <div>
                  {format(parseISO(command.delivery_date), 'MM/dd/yyyy')}
                </div>
              </div>
              <div className="flex mb-2 text-base leading-none text-left">
                <FaMapMarkerAlt className="mr-1" />
                <div>
                  {' '}
                  {command.delivery_address_option === DELIVERY_OPTION.HOME
                    ? 'HOME'
                    : command.delivery_address}
                </div>
              </div>
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
    </Card>
  )
}
export default CommandItem
