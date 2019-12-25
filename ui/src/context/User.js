import React, { createContext, useContext, useReducer } from 'react'
import { UserStateTemplate, UserActions } from '../reducers/User'

const UserContext = createContext()

export const UserProvider = ({
  reducer = UserActions,
  initialState = UserStateTemplate,
  children,
}) => (
  <UserContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </UserContext.Provider>
)
export const useUserContextState = () => useContext(UserContext)
