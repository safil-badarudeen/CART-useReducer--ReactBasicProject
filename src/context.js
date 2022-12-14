import React, { useState, useContext, useReducer, useEffect } from 'react'
import cartItems from './data'
import reducer from './reducer'


const AppContext = React.createContext()

const initialState={
  loading: false,
  cart : cartItems,
  total: 0,
  amount : 0
}


const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer,initialState)
  const clearCart=()=>{
    dispatch({type:'CLEAR_CART'})
  }

  const removeOneItem=(id)=>{
    dispatch({type:'REMOVE_ONE_ITEM' , payload: id })
  }

  const increase=(id)=>{
    dispatch({type:'INCREASE', payload : id})
  }

  const decrease=(id)=>{
    dispatch({type:'DECREASE', payload: id})
  }

  useEffect(()=>{
   dispatch({type:'GET_TOTALS'})
  },[state.cart])
  

  return (
    <AppContext.Provider
      value={{
       ...state,
       clearCart,
       removeOneItem,
       decrease,
       increase
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
