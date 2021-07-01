const DELIVERY_OPTION = {
  HOME: 0,
  POSITION: 1,
}

const CommandInfo = ({ command }) => {
  return (
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
  )
}

export default CommandInfo
