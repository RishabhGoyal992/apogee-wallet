import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'

import * as reducers from './reducers'
import * as api from './constants/api'
import { setupRealtimeBalance } from './firebaseDatabase'
import { setupRealtimeTokens } from './firebaseDatabase'

let composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let x;
const initStore = (x = localStorage.getItem(api.LOCALSTORAGE_LOGIN)) ? JSON.parse(x) : {}; //eslint-line-disable
const store = createStore(combineReducers(reducers), initStore, composeEnhancers(applyMiddleware(thunk)))

if (initStore.userProfile && initStore.userProfile.userId) {
  const state = store.getState()

  let isRealtimeBalanceReady  = false;
  let isRealtimeTokenReady  = false;
  // becuase setupRealtimeBalance is undefined sometimes
  const runRealTime = () => {
    if (!isRealtimeBalanceReady) {
      if (setupRealtimeBalance) {
        isRealtimeBalanceReady = true;
        setupRealtimeBalance(state.userProfile.isBitsian, state.userProfile.userId, store.dispatch)
      }
      else {
        setTimeout(() => runRealTime() , 100)
      }
    }

    if (!isRealtimeTokenReady) {
      if (setupRealtimeTokens) {
        isRealtimeTokenReady = true;
        setupRealtimeTokens(state.userProfile.isBitsian, state.userProfile.userId, store.dispatch)
      }
      else {
        setTimeout(() => runRealTime() , 100)
      }
    }
  }
  runRealTime();
}

store.subscribe(() => {
  const state = store.getState();
  let { auth, userProfile, cart, profshows: { showsCart } } = state;
  if (!auth.isLoggedIn) {
    localStorage.removeItem(api.LOCALSTORAGE_LOGIN);
  }
  auth = { ...auth, isMessageSet: false, message: "" }
  userProfile = { ...userProfile, balance: null }

  const localStorageItem = {
    auth, userProfile, cart, profshows: { showsCart, allProfshowsData: {} }
  }
  localStorage.setItem(api.LOCALSTORAGE_LOGIN, JSON.stringify(localStorageItem));
});

export default store