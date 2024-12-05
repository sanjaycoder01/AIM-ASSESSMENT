import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux' // Import the Provider
import store from './redux/store' // Import the Redux store
import App from './App'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {' '}
      {/* Wrap the App with Provider */}
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)
