import React, { useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import socketIOClient from 'socket.io-client'
import './App.css'

import ScrollToTop from 'components/ScrollToTop'
import Modal from 'components/Modal'
import { usePriceContextState } from './context/Price'
import Dashboard from './pages/Dashboard'
import Nav from './components/Nav'
import { IntlProvider } from 'react-intl'
import localeMessages from './locales'
import bcp47 from 'bcp-47'

window.socket = socketIOClient(
  'https://bitswing-server-mainnet.bandprotocol.com',
)

export default () => {
  const [_, priceDispatch] = usePriceContextState()
  const language = bcp47.parse(navigator.language).language
  useEffect(() => {
    window.socket.on('init', props => {
      priceDispatch({ type: 'init', init: props })
    })
    window.socket.on('update', props => {
      window.priceData = props.data
      priceDispatch({ type: 'setLatest', latest: props })
    })
  }, [])
  return (
    <IntlProvider
      locale={navigator.language}
      messages={
        localeMessages[language]
          ? localeMessages[language]
          : localeMessages['en']
      }
    >
      <Router>
        <ScrollToTop />
        <Nav />
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/" render={() => <Redirect to="/" />} />
        </Switch>
        <Modal />
      </Router>
    </IntlProvider>
  )
}
