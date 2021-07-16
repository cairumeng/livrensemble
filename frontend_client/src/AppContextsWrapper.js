import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query'
import { positions } from 'react-alert'
import { Provider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import { AuthContextProvider } from './context/useAuth'
import { CartContextProvider } from './context/useCart'

const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
}
const AppContextsWrapper = (App) => () => {
  const queryClient = new QueryClient()
  return (
    <Router>
      <Provider template={AlertTemplate} {...options}>
        <QueryClientProvider client={queryClient}>
          <AuthContextProvider>
            <CartContextProvider>
              <App />
            </CartContextProvider>
          </AuthContextProvider>
        </QueryClientProvider>
      </Provider>
    </Router>
  )
}

export default AppContextsWrapper
