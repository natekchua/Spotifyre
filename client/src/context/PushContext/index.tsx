import React, { createContext, useContext, useEffect, useState } from 'react';
import { messaging, getPushToken } from '../../firebase';
import { PushContextProviderProps, PushContextProviderValue } from './types';

const PushContext = createContext({} as PushContextProviderValue);

export const PushContextProvider: React.FC = ({ children }: PushContextProviderProps) => {
  const [token, setToken] = useState('');

  useEffect(() => {
    async function cb () {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        const token = await getPushToken();
        // TODO: send token to BE
        setToken(token);
        messaging.onMessage((payload) => {
          console.log('onMessage', payload);
          // TODO: display toast/in-app notification
        });
      } else if (permission === 'denied') {
        // TODO: show some UI saying push is disabled
      }
    }
    cb();
  }, []);

  return (
    <PushContext.Provider value={{ token }}>
      {children}
    </PushContext.Provider>
  );
};

export const usePushContext = () => useContext(PushContext);
