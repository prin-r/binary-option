import React from 'react'

const { Provider, Consumer } = React.createContext({})

// This is where an app-wide requirements should be fetched
class ModalProvider extends React.Component {
  state = {
    modal: {},
  }

  constructor(props) {
    super(props)
    this.lastestOpen = Date.now()
    window.modal = this
  }

  setModal(name, params = {}) {
    if (Date.now() - this.lastestOpen < 1000) {
      return
    } else {
      this.lastestOpen = Date.now()
    }
    this.setState({ modal: { name, params } })
  }

  hideModal() {
    this.setState({ modal: {} })
  }

  render() {
    const { children } = this.props

    return (
      <Provider
        value={{
          ...this.state,
          setModal: this.setModal.bind(this),
          hideModal: this.hideModal.bind(this),
        }}
      >
        {children}
      </Provider>
    )
  }
}

export { ModalProvider, Consumer as ModalConsumer }
