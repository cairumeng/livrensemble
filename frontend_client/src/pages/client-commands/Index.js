import axios from 'axios'
import { useState, useEffect } from 'react'
import { useMutation } from 'react-query'
import { format, parseISO } from 'date-fns'
import Spinner from 'react-rainbow-components/components/Spinner'
import Card from 'react-rainbow-components/components/Card'
import Pagination from 'react-rainbow-components/components/Pagination'
import Button from 'react-rainbow-components/components/Button'
import { useHistory } from 'react-router'
import { isBrowser, isMobileOnly } from 'react-device-detect'
import ProgressIndicator from 'react-rainbow-components/components/ProgressIndicator'
import ProgressStep from 'react-rainbow-components/components/ProgressStep'

const STATUS = {
  0: 'Grouping',
  1: 'Success',
  2: 'Fail',
  3: 'Canceled',
  4: 'Preparation',
  5: 'Shipped',
  6: 'Arrived',
}

const Progress = ({ currentStep }) => {
  return (
    <div className="self-center">
      {currentStep === 'Fail' && (
        <ProgressIndicator className="ml-20" currentStepName={currentStep}>
          <ProgressStep name="Grouping" label="Grouping" />
          <ProgressStep name="Fail" label="Fail" hasError />
        </ProgressIndicator>
      )}

      {currentStep === 'Canceled' && (
        <ProgressIndicator className="ml-20" currentStepName={currentStep}>
          <ProgressStep name="Grouping" label="Grouping" />
          <ProgressStep name="Canceled" label="Canceled" hasError />
        </ProgressIndicator>
      )}
      {currentStep !== 'Fail' && currentStep !== 'Canceled' && (
        <ProgressIndicator className="ml-20" currentStepName={currentStep}>
          <ProgressStep name="Grouping" label="Grouping" />
          <ProgressStep name="Success" label="Success" />
          <ProgressStep name="Preparation" label="Preparation" />
          <ProgressStep name="Shipped" label="Shipped" />
          <ProgressStep name="Arrived" label="Arrived" />
        </ProgressIndicator>
      )}
    </div>
  )
}

const ClientCommand = ({ command }) => {
  const [currentStep, setCurrentStep] = useState(STATUS[0])

  const history = useHistory()

  useEffect(() => {
    setCurrentStep(STATUS[command.restaurant_command.status])
  }, [command])
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
                  parseISO(command.client_command.created_at),
                  'MM/dd/yyyy'
                )}
              </div>
            </div>
            <div className="ml-7">
              Total
              <div>Euro {command.client_command.amount}</div>
            </div>
          </div>
          <div className="ml-7">
            N°Command
            <div className="font-bold">{command.client_command.id}</div>
          </div>
        </div>
      }
    >
      <div className="flex mb-3 pl-3 justify-between">
        <div className="flex w-full">
          <img
            src={command.restaurant.avatar}
            className="w-16 h-16 transition-all duration-200 ease-in-out"
          />
          {isBrowser && <Progress currentStep={currentStep} />}
        </div>

        <Button
          size="small"
          label="Detail"
          variant="brand"
          className="rounded-lg h-10 mr-5"
          onClick={() =>
            history.push(`/my-commands/${command.client_command.id}`)
          }
        />
      </div>
      {/* {isMobileOnly && <Progress currentStep={currentStep} />} */}
    </Card>
  )
}

const ClientCommandList = ({ commands }) => (
  <>
    {commands.map((command) => (
      <ClientCommand command={command} key={command.client_command.id} />
    ))}
  </>
)

const Index = () => {
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
    <div className="max-w-7xl mx-auto my-auto px-2 sm:px-6 lg:px-8 pt-20 text-center ">
      <ClientCommandList commands={myCommands} />
      <Pagination
        className="p-5"
        pages={totalPage}
        activePage={activePage}
        onChange={changePageHandler}
      />
    </div>
  )
}
export default Index
