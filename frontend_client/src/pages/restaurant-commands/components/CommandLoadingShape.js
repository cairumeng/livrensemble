import Card from 'react-rainbow-components/components/Card'
import LoadingShape from 'react-rainbow-components/components/LoadingShape'
import { Link } from 'react-router-dom'

const CommandLoadingShape = () =>
  [0, 1, 2, 3].map((i) => (
    <Card className="relative mb-3 block px-3 py-5" key={i}>
      <Link className="flex items-start no-underline hover:no-underline">
        <div className=" flex items-stretch justify-between sm:justify-items-start sm:flex-col">
          <div className="flex pr-5 md:pr-4  pr-0">
            <LoadingShape
              variant="image"
              shape="square"
              className="w-36 h-36 transition-all duration-200 ease-in-out"
            />
            <div className="ml-6 ">
              <div className="text-left relative -top-0.5 mt-0 mb-2.5 transition-all duration-200 ease-in-out text-lg leading-snug font-bold w-1/4 h-6">
                <LoadingShape />
              </div>

              <div className="mb-2 text-base leading-none text-left">
                <LoadingShape />
              </div>

              <div className="mb-2 text-base leading-none text-left">
                <LoadingShape />
              </div>

              <div className="mb-2 text-base leading-none text-left">
                <LoadingShape />
              </div>

              <div className="mb-2 text-base leading-none text-left">
                <LoadingShape />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  ))

export default CommandLoadingShape
