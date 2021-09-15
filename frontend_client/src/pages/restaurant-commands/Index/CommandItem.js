import Card from 'react-rainbow-components/components/Card'
import { FaCalendarAlt, FaShippingFast, FaMapMarkerAlt } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'
import { format, parseISO } from 'date-fns'
const DELIVERY_OPTION = {
  HOME: 0,
  POSITION: 1,
}

const CommandItem = ({ command }) => {
  const history = useHistory()
  return (
    <Card className="relative mb-5 block pl-3 md:pl-5 py-3 md:py-5 cursor-pointer w-11/12 md:w-3/4">
      <div
        className="w-full flex items-stretch justify-between sm:justify-items-start sm:flex-col"
        onClick={() => history.push(`restaurant-commands/${command.id}`)}
      >
        <div className="flex pr-5 md:pr-4 w-full pr-0">
          <img
            alt={command.restaurant.name}
            className="w-20 h-20 md:w-36 md:h-36 transition-all duration-200 ease-in-out self-center"
            src={command.restaurant.avatar}
          />
          <div className="ml-4 md:ml-10 flex flex-col justify-between">
            <div>
              <div className="text-left relative -top-0.5 mt-0 md:mb-2.5 transition-all duration-200 ease-in-out md:text-lg leading-snug font-bold">
                {command.restaurant.name}
              </div>

              <div className="leading-none sm:text-sm text-left">
                {command.restaurant.description}
              </div>
            </div>
            <div className="mt-2 md:mt-3 sm:text-sm">
              <div className="flex md:mb-2 leading-none text-left">
                <FaCalendarAlt className="mr-1" />
                <div>{format(parseISO(command.ended_at), 'MM/dd/yyyy')}</div>
              </div>
              <div className="flex md:mb-2 leading-none text-left">
                <FaShippingFast className="mr-1" />
                <div>
                  {format(parseISO(command.delivery_date), 'MM/dd/yyyy')}
                </div>
              </div>
              <div className="flex md:mb-2 leading-none text-left">
                <FaMapMarkerAlt className="mr-1" />
                {command.delivery_address_option === DELIVERY_OPTION.HOME ? (
                  <div>HOME</div>
                ) : (
                  <div>{command.delivery_address}</div>
                )}
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
