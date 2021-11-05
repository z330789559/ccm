import React, { useReducer } from 'react'

const renderInitalState = (mobile) => {
  return {
    window: mobile ? 400 : 1200
  }
}

export const MyContext = React.createContext()

export function reducer(state, action) {
  const data = action.data
  switch (action.type) {
    case 'SET_WINDOW':
      return { ...state, window: data }
    default:
      return state
  }
}

const ContextProvider = (props) => {
  const { mobile } = props
  const [state, dispatch] = useReducer(reducer, renderInitalState(mobile))
  return <MyContext.Provider value={{ state, dispatch }}>{props.children}</MyContext.Provider>
}
export default ContextProvider
