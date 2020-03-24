import request from 'request'

import * as userProfile from '@/constants/userProfile'
import * as api from '@/constants/api'
import * as ui from '@/actionCreators/ui'
import { UNKNOWN_ERROR } from '@/constants/ui'
//import {handleResponse} from '@/utils'

export const setProfile = (payload) => {
  return {
    type: userProfile.SET_PROFILE,
    payload
  }
}

export const updateBalance = balance => {
  return {
    type: userProfile.UPDATE_BALANCE,
    payload: { balance }
  }
}

export const updateTokens = tokens => {
  return {
    type: userProfile.UPDATE_TOKENS,
    payload: { tokens }
  }
}

export const updateQR = qrCode => {
  return {
    type: userProfile.UPDATE_QR,
    payload: { qrCode }
  }
}

export const refreshQR = () => (dispatch, getState) => {
  request({
    method: 'POST',
    url: api.REFRESH_QR,
    headers: {
      'Content-Type': 'application/json',
      'X-Wallet-Token': api.WALLET_TOKEN,
      'Access-Control-Allow-Origin': '*',
      'Authorization': `JWT ${getState().auth.JWT}`,
    },
  }, (error, response, body) => {
    dispatch(ui.hideLoader());
    if (error || !response) {
      dispatch(ui.showSnackbar(UNKNOWN_ERROR));
    }
    else if (response.statusCode === 200) {
      try {
        body = JSON.parse(body)
        body.qr_code && dispatch(updateQR(body.qr_code));
      } catch (e) {
        dispatch(ui.showSnackbar(UNKNOWN_ERROR));
      }
    }
    else {
      try {
        body = JSON.parse(body)
        if (!body.display_message) throw new Error("No display message");
        dispatch(ui.showSnackbar(body.display_message));
      } catch (e) {
        dispatch(ui.showSnackbar(UNKNOWN_ERROR));
      }
    }
  })
}