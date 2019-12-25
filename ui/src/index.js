import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { GlobalProvider } from './context/Global'
import { PriceProvider } from './context/Price'
import { UserProvider } from './context/User'
import { ModalProvider } from './context/Modal'
import { OpenOrderProvider } from './context/OpenOrder'
import { TxProvider } from './context/Tx'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { ApolloProvider } from 'react-apollo'
import { ApolloProvider as ApolloHooksProvider } from '@apollo/react-hooks'

import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { onError } from 'apollo-link-error'
import { ApolloLink } from 'apollo-link'
import { WebSocketLink } from 'apollo-link-ws'
import Web3Provider from 'web3-react'
import Web3ReactManager from './components/Web3ReactManager'
import Web3 from 'web3'

import connectors from './connectors'

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
          ),
        )
      if (networkError) console.log(`[Network error]: ${networkError}`)
    }),
    new WebSocketLink({
      uri: 'wss://api.thegraph.com/subgraphs/name/taobun/bitswing-mainnet',
      options: {
        reconnect: true,
      },
    }),
  ]),
  cache: new InMemoryCache(),
})

ReactDOM.render(
  <Web3Provider connectors={connectors} libraryName="web3.js" web3Api={Web3}>
    <Web3ReactManager>
      <ModalProvider>
        <ApolloProvider client={client}>
          <ApolloHooksProvider client={client}>
            <GlobalProvider>
              <PriceProvider>
                <UserProvider>
                  <OpenOrderProvider>
                    <TxProvider>
                      <App />
                    </TxProvider>
                  </OpenOrderProvider>
                </UserProvider>
              </PriceProvider>
            </GlobalProvider>
          </ApolloHooksProvider>
        </ApolloProvider>
      </ModalProvider>
    </Web3ReactManager>
  </Web3Provider>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister()
