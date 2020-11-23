import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from './components/Context/Provider';
import { initialState } from './components/Context/initialState';
import reducer from './components/Context/reducer';

ReactDOM.render(
  <React.StrictMode>
    <Provider initialState={initialState} reducer={reducer}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
