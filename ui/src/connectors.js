import { Connectors } from 'web3-react'
import FortmaticApi from 'fortmatic'

const {
  InjectedConnector,
  NetworkOnlyConnector,
  WalletConnectConnector,
  FortmaticConnector,
} = Connectors

const supportedNetworkURLs = {
  1: 'https://mainnet.infura.io/v3/60ab76e16df54c808e50a79975b4779f',
  4: 'https://rinkeby.infura.io/v3/60ab76e16df54c808e50a79975b4779f',
}

const defaultNetwork = 1

const Injected = new InjectedConnector({
  supportedNetworks: [1, 4],
})

const Network = new NetworkOnlyConnector({
  providerURL: supportedNetworkURLs[(1, 4)],
})

const Fortmatic = new FortmaticConnector({
  api: FortmaticApi,
  apiKey: 'pk_live_F95FEECB1BE324B5',
  logoutOnDeactivation: false,
})

export default {
  Injected,
  Network,
  Fortmatic,
}
