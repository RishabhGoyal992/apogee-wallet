import request from 'request'

import * as auth from '@/constants/auth'
import * as api from '@/constants/api'
import { setProfile } from './userProfile'
import * as ui from './ui'
import firebase from 'firebase/app'
import { provider } from '@/firebaseConfig'
import { setupRealtimeBalance } from '@/firebaseDatabase'
import { setupRealtimeTokens } from '@/firebaseDatabase'
import { handleResponse } from '@/utils'
import * as cart from './cart';
import * as profshows from './profshows';

export const changeLoginStatus = (isLoggedIn, JWT) => (dispatch, getState) => {
  
  if (isLoggedIn) {
    dispatch(cart.clearCart());
    dispatch(profshows.clearShowsCart());
  }

  dispatch({
    type: auth.SET_LOGIN,
    payload: {
      JWT, isLoggedIn
    }
  });
}

export const login = (username, password) => (dispatch, getState) => {
  dispatch(ui.showLoader());
  request({
    method: 'POST',
    url: api.LOGIN,
    headers: {
      'Content-Type': 'application/json',
      'X-Wallet-Token': api.WALLET_TOKEN,
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      username, password
    })
  }, (error, response, body) => {
    handleResponse(error, response, body, () => {
      try {
        body = JSON.parse(body)
        const { JWT } = body
        dispatch(setProfile({
          ...body,
          isBitsian: body.bitsian_id && body.bitsian_id.trim().length > 0
        }))
        dispatch(changeLoginStatus(true, JWT))
        setupRealtimeBalance(getState().userProfile.isBitsian, getState().userProfile.userId, dispatch);
        setupRealtimeTokens(getState().userProfile.isBitsian, getState().userProfile.userId, dispatch);
      } catch (e) {
        throw new Error(e.message || "");
      }
    })
  });
}

export const getIdToken = () => (dispatch, getState) => {
  firebase.auth().signInWithRedirect(provider)
}

export const googleLogin = id => (dispatch, getState) => {
  dispatch(ui.showLoader());
  request({
    method: 'POST',
    url: api.LOGIN,
    headers: {
      'Content-Type': 'application/json',
      'X-Wallet-Token': api.WALLET_TOKEN,
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      id_token: id
    })
  }, (error, response, body) => {
    handleResponse(error, response, body, () => {
      try {
        body = JSON.parse(body)
        const { JWT } = body
        dispatch(changeLoginStatus(true, JWT))
        dispatch(setProfile({
          ...body,
          isBitsian: body.bitsian_id && body.bitsian_id.trim().length > 0
        }))
        setupRealtimeBalance(getState().userProfile.isBitsian, getState().userProfile.userId, dispatch);
        setupRealtimeTokens(getState().userProfile.isBitsian, getState().userProfile.userId, dispatch);
      } catch (e) {
        throw new Error(e.message || "");
      }
    })
  });
}

export const setErrorMessage = (isMessageSet, message) => {
  return {
    type: auth.SET_ERRORMESSAGE,
    payload: {
      isMessageSet, message
    }
  }
}