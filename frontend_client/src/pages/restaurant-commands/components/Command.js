import Card from 'react-rainbow-components/components/Card'
import { Link } from 'react-router-dom'
import CommandInfo from './CommandInfo'

const Command = ({ command }) => {
  return (
    <Card className="relative mb-3 block px-3 py-5">
      <Link className="flex items-start no-underline hover:no-underline">
        <div className="w-full flex items-stretch justify-between sm:justify-items-start sm:flex-col">
          <CommandInfo command={command} />
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
export default Command
