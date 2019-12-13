import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

import Routes from './routes'
import store from './store'

import 'materialize-css/dist/css/materialize.min.css'
import './assets/css/style.css'

const App = () => (
  <div className="App">
    <Provider store={store}>
      <BrowserRouter>
        <Routes/>
      </BrowserRouter>
    </Provider>
  </div>
)

export default App;

