import React from 'react';
import ReactDOM from 'react-dom'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import { createStore } from 'redux'
import chains from './redux/chains'
import { Provider } from 'react-redux'

const store = createStore(chains, chains.initialState)
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>, document.getElementById('root'));
registerServiceWorker();
