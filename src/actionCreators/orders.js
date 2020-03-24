import request from 'request'

import * as orders from '@/constants/orders'
import * as api from '@/constants/api'
import { setupRealtimeOrders } from '@/firebaseDatabase'

import { handleResponse } from '@/utils'
import * as ui from '@/actionCreators/ui'

export const getOrders = orders => (dispatch, getState) => {
  dispatch(ui.showLoader());
  request({
    method: 'GET',
    url: api.GET_ORDERS,
    headers: {
      'Content-Type': 'application/json',
      'X-Wallet-Token': api.WALLET_TOKEN,
      'Authorization': `JWT ${getState().auth.JWT}`
    }
  }, (error, response, body) => {
    handleResponse(error, response, body, () => {
      try {
        body = JSON.parse(body)
        dispatch(setOrders(body))
        setupRealtimeOrders(getState().userProfile.isBitsian, getState().userProfile.userId, dispatch);
      }
      catch (e) {
        throw new Error(e.message || "");
      }
    })
  });
}

export const setOrders = payload => ({
  type: orders.SET_ORDERS,
  payload
})

export const updateOrderStatuses = payload => ({
  type: orders.UPDATE_ORDER_STATUSES,
  payload
})