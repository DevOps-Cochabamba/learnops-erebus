import './global'

import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { ApolloProvider } from 'react-apollo'

import App from './pages/App'
import registerServiceWorker from './sw'
import reducer from './react/reducers'
 
import './styles/main.css'
import './styles/pages/home.css'
import './styles/pages/common.css'
import './styles/pages/control.css'
import './styles/pages/simulator.css'

import './react/i18n/i18n'
import './core'
import { client } from './apollo';

const middlewares = [ thunk ]
if (process.env.NODE_ENV !== 'production') {
  middlewares.push(createLogger())
}

const store = createStore(reducer, applyMiddleware(...middlewares))

render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
)

registerServiceWorker()
