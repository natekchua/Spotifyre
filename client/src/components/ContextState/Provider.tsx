import React, { createContext, useContext, useReducer } from 'react';
import { initialState } from './initialState';
import {
  ContextStateReducer,
  ContextProviderProps,
  ProviderProps
} from './types';

export const Context = createContext<ContextProviderProps>([
  initialState,
  () => initialState
]);

export const Provider: React.FC<ProviderProps> = ({
  children,
  initialState,
  reducer
}: ProviderProps) => {
  const value = useReducer<ContextStateReducer>(reducer, initialState);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useProviderValue = () => useContext(Context); // Expose Context to App
