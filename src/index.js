// @flow

import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { Provider } from 'react-redux'
import enUS from 'antd/lib/locale-provider/en_US'
import { LocaleProvider } from 'antd'
import * as actions from './state/actions'
import './index.css'
import store from './state/store'

store.dispatch(actions.fetchDataFromDb())

ReactDOM.render(
  <Provider store={store}>
    <LocaleProvider locale={enUS}>
      <App />
    </LocaleProvider>
  </Provider>,
  document.getElementById('root')
)
