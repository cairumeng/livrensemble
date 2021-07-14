import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import axios from 'axios'
import Application from 'react-rainbow-components/components/Application'

import './index.css'

const theme = {
  rainbow: {
    palette: {
      success: '#FC0',
      brand: '#3B82F6',
    },
  },
}

axios.defaults.baseURL = process.env.REACT_APP_HOST_URL
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'

ReactDOM.render(
  <React.StrictMode>
    <Application theme={theme}>
      <App />
    </Application>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
