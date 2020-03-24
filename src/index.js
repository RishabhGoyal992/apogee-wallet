import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import './index.scss';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import './firebaseConfig'
import './firebaseOauth'
import store from './store'


ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'));

serviceWorker.unregister();
