import React, { createContext, useContext, useReducer } from 'react';

export const Context = createContext();

export const Provider = (props) => {
  const {
    initialState,
    reducer,
    children
  } = props;

  return (
    <Context.Provider value={useReducer(reducer, initialState)}>
      {children}
    </Context.Provider>
  );
}

export const useProviderValue = () => useContext(Context);  // Expose Context to App
