import React from 'react'
import { ModalConsumer } from 'context/Modal'
import ModalOverlay from './ModalOverlay'
import LoginModal from './LoginModal'
import InstructionModal from './InstructionModal'
import InfoRegisterModal from './InfoRegisterModal'
import TosModal from './TosModal'
import InformModal from './InformModal'

export default class Modal extends React.Component {
  render() {
    return (
      <ModalConsumer>
        {({ modal = {}, setModal, hideModal }) => {
          return (
            <ModalOverlay hideModal={modal.name && hideModal}>
              {modal.name &&
                (() => {
                  const { name, params } = modal
                  switch (name) {
                    case 'login':
                      return <LoginModal hideModal={hideModal} {...params} />
                    case 'instruction':
                      return (
                        <InstructionModal hideModal={hideModal} {...params} />
                      )
                    case 'register':
                      return (
                        <InfoRegisterModal hideModal={hideModal} {...params} />
                      )
                    case 'inform':
                      return <InformModal hideModal={hideModal} {...params} />
                    case 'tos':
                      return <TosModal hideModal={hideModal} {...params} />
                    default:
                      throw Error(`Modal ${name} not found.`)
                  }
                })()}
            </ModalOverlay>
          )
        }}
      </ModalConsumer>
    )
  }
}
