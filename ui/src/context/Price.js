import React, { createContext, useContext, useReducer } from 'react'
import { PriceStateTemplate, PriceActions } from '../reducers/Price'

const PriceContext = createContext()

export const PriceProvider = ({
  reducer = PriceActions,
  initialState = PriceStateTemplate,
  children,
}) => (
  <PriceContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </PriceContext.Provider>
)
export const usePriceContextState = () => useContext(PriceContext)
