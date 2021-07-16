import { Redirect, Route } from 'react-router-dom'

const ProtectedRoute = ({ condition, failedRedirectUrl, ...props }) =>
  condition ? <Route {...props} /> : <Redirect to={failedRedirectUrl} />

export default ProtectedRoute
