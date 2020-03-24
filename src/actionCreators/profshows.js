import request from 'request'

import * as profshows from '@/constants/profshows'
import * as api from '@/constants/api'

import * as ui from '@/actionCreators/ui'
import { handleResponse } from '@/utils'

export const setAllProfshows = (showsData) => ({
  type: profshows.SET_ALL_PROFSHOWS,
  payload: showsData
});

export const setMyProfshows = (myShowsData) => ({
  type: profshows.SET_MY_PROFSHOWS,
  payload: myShowsData
});

export const clearShowsCart = () => ({
  type: profshows.SHOWS_CLEAR
})

export const getAllProfshows = () => (dispatch, getState) => {
  dispatch(ui.showLoader())
  request({
    method: 'GET',
    url: api.GET_ALL_PROFSHOWS,
    headers: {
      'Content-Type': 'application/json',
      'X-Wallet-Token': api.WALLET_TOKEN,
      'Authorization': `JWT ${getState().auth.JWT}`,
      'Access-Control-Allow-Origin' : '*'
    }
  }, function (error, response, body) {
      handleResponse (error, response, body, () => {
        try {
          let profshowsData = JSON.parse(body);
          dispatch(setAllProfshows(profshowsData));
        }
        catch (e) {
          throw new Error (e.message || "")
        }
      })
  });
}

export const buyTickets = () => (dispatch, getState) => {
  dispatch(ui.showLoader());
  let showsCart = getState().profshows.showsCart;
  request({
    method: 'POST',
    url: api.BUY_TICKETS,
    headers: {
      'Content-Type': 'application/json',
      'X-Wallet-Token': api.WALLET_TOKEN,
      'Authorization': `JWT ${getState().auth.JWT}`,
      'Access-Control-Allow-Origin' : '*'
    },
    body: JSON.stringify(showsCart)
  }, function (error, response, body) {
    handleResponse (error, response, body, () => {
      try {
        dispatch(ui.showSnackbar("Tickets bought!"));
        dispatch(clearShowsCart());
      }
      catch (e) {
        throw new Error (e.message || "")
      }
    })
  });
}

export const getMyProfshows = () => (dispatch, getState) => {
  request({
    method: 'GET',
    url: api.GET_MY_PROFSHOWS,
    headers: {
      'Content-Type': 'application/json',
      'X-Wallet-Token': api.WALLET_TOKEN, 
      'Authorization': `JWT ${getState().auth.JWT}`,
      'Access-Control-Allow-Origin' : '*'
    }
  }, function (error, response, body) {
    let profshowsData = JSON.parse(body);
    dispatch(setMyProfshows(profshowsData));
  });
}


export const increaseComboQty = (id) => ({
  type: profshows.INC_COMBO_QTY,
  id
});

export const decreaseComboQty = (id) => ({
  type: profshows.DEC_COMBO_QTY,
  id
});

export const increaseShowQty = (id) => ({
  type: profshows.INC_SHOW_QTY,
  id
});

export const decreaseShowQty = (id) => ({
  type: profshows.DEC_SHOW_QTY,
  id
});
