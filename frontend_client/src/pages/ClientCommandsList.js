import axios from 'axios'
import { useState, useEffect } from 'react'
import { useMutation } from 'react-query'
import { format, parseISO } from 'date-fns'
import Spinner from 'react-rainbow-components/components/Spinner'
import Card from 'react-rainbow-components/components/Card'
import Path from 'react-rainbow-components/components/Path'
import PathStep from 'react-rainbow-components/components/PathStep'
import Pagination from 'react-rainbow-components/components/Pagination'
import Button from 'react-rainbow-components/components/Button'
import id from 'date-fns/esm/locale/id/index'
import { useHistory } from 'react-router'

const STATUS = {
  0: 'Grouping',
  1: 'Success',
  2: 'Fail',
  3: 'Canceled',
  4: 'Preparation',
  5: 'Shipped',
  6: 'Arrive',
}

const ClientCommand = ({ myCommand }) => {
  const [currentStep, setCurrentStep] = useState(STATUS[0])
  const history = useHistory()

  useEffect(() => {
    setCurrentStep(STATUS[myCommand.restaurant_command.status])
  }, [myCommand])
  return (
    <Card
      className="my-5 p-2 w-full"
      title={
        <div className="flex">
          <div className="flex">
            <div>
              Ordered At
              <div>
                {format(
                  parseISO(myCommand.client_command.created_at),
                  'MM/dd/yyyy'
                )}
              </div>
            </div>
            <div className="ml-7">
              Total
              <div>Euro {myCommand.client_command.amount}</div>
            </div>
          </div>
          <div className="ml-7">
            N°Command
            <div className="font-bold">{myCommand.client_command.id}</div>
          </div>
        </div>
      }
    >
      <div className="flex mb-3 pl-3 justify-between">
        <div className="flex">
          <img
            src={myCommand.restaurant.avatar}
            className="w-16 h-16 transition-all duration-200 ease-in-out"
          ></img>
          <div className="self-center">
            {currentStep === 'Fail' && (
              <Path className=" ml-20" currentStepName={currentStep}>
                <PathStep name="Grouping" label="Grouping" />
                <PathStep name="Fail" label="Fail" hasError />
              </Path>
            )}

            {currentStep === 'Canceled' && (
              <Path className=" ml-20" currentStepName={currentStep}>
                <PathStep name="Grouping" label="Grouping" />
                <PathStep name="Canceled" label="Canceled" hasError />
              </Path>
            )}
            {currentStep !== 'Fail' && currentStep !== 'Canceled' && (
              <Path className=" ml-20" currentStepName={currentStep}>
                <PathStep name="Grouping" label="Grouping" />
                <PathStep name="Success" label="Success" />
                <PathStep name="Preparation" label="Preparation" />
                <PathStep name="Shipped" label="Shipped" />
                <PathStep name="Arrived" label="Arrived" />
              </Path>
            )}
          </div>
        </div>
        <Button
          size="small"
          variant="brand"
          className="rounded-lg h-10 mr-5"
          onClick={() => history.push(`/my-commands/${id}`)}
        >
          Detail
        </Button>
      </div>
    </Card>
  )
}

const ClientCommandsList = () => {
  const [myCommands, setMyCommands] = useState([])
  const [activePage, setActivePage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)

  useEffect(() => {
    getMyCommandsMutation.mutate()
  }, [activePage])

  const getMyCommandsMutation = useMutation(
    () => axios.get(`/client-commands?page=${activePage}`),
    {
      onSuccess: ({ data }) => {
        setMyCommands(data.data)
        setTotalPage(data.meta.last_page)
        setActivePage(data.meta.current_page)
      },
    }
  )

  if (getMyCommandsMutation.isLoading) {
    return <Spinner />
  }
  const changePageHandler = (_, page) => {
    setActivePage(page)
  }

  return (
    <div className="max-w-7xl mx-auto my-auto px-2 sm:px-6 lg:px-8 mt-7 text-center ">
      {myCommands.map((myCommand) => (
        <ClientCommand
          myCommand={myCommand}
          key={myCommand.client_command.id}
        />
      ))}
      <Pagination
        className="p-5"
        pages={totalPage}
        activePage={activePage}
        onChange={changePageHandler}
      />
    </div>
  )
}
export default ClientCommandsList
