import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from './components/ContextState/Provider';
import { initialState } from './components/ContextState/initialState';
import reducer from './components/ContextState/reducer';
import './index.css';
import { registerFirebaseMessaging } from './serviceWorker';
import { PushContextProvider } from './context/PushContext';

ReactDOM.render(
  <Provider initialState={initialState} reducer={reducer}>
    <PushContextProvider>
      <App />
    </PushContextProvider>
  </Provider>,
  document.getElementById('root')
);

registerFirebaseMessaging();