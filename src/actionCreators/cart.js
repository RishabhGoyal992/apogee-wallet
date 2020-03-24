import request from 'request'

import * as cart from '@/constants/cart'
import * as api from '@/constants/api'

import * as ui from './ui'
import { handleResponse } from '@/utils'

export const addNewItemToCart = (stallName, stallId, itemName, itemId, price) => ({
  type: cart.ADD_TO_CART,
  stallName,
  stallId,
  itemName,
  itemId,
  price
});

export const addToCart = (stallName, stallId, itemName, itemId, price) => (dispatch, getState) => {
  let cart = getState().cart;

  if (cart[stallId] && cart[stallId].items[itemId]) {
    dispatch(increaseQty(stallId, itemId));
  }
  else {
    dispatch(addNewItemToCart(stallName, stallId, itemName, itemId, price));
  }
}

export const increaseQty = (stallId, itemId) => ({
  type: cart.INC_QTY,
  stallId,
  itemId
});

export const decreaseQty = (stallId, itemId) => ({
  type: cart.DEC_QTY,
  stallId,
  itemId
});

export const clearCart = () => ({
  type: cart.CART_CLEAR
});

export const placeOrder = () => (dispatch, getState) => {
  let requestBody = {};
  let cart = getState().cart;

  if (Object.entries(cart).length !== 0) {
    Object.keys(cart).forEach(stallId => {
      requestBody[stallId] = {};
      Object.keys(cart[stallId].items).forEach(itemId => {
        requestBody[stallId][itemId] = cart[stallId].items[itemId].quantity;
      })
    })

    dispatch(ui.showLoader());

    request({
      method: 'POST',
      url: api.PLACE_ORDER,
      body: JSON.stringify({orderdict: requestBody}),
      headers: {
        'Content-Type': 'application/json',
        'X-Wallet-Token': api.WALLET_TOKEN, 
        'Authorization': `JWT ${getState().auth.JWT}`,
        'Access-Control-Allow-Origin' : '*'
      }}, (error, response, body) => {
        handleResponse(error, response, body, () => {
          try {
            dispatch(ui.showSnackbar("Order placed successfully"));
            dispatch(clearCart());

            request({
              method: 'POST',
              url: api.ANALYTICS,
              body: JSON.stringify({key: "orders_by_webapp"}),
              headers: {
                'Content-Type': 'application/json',
                'X-Wallet-Token': api.WALLET_TOKEN, 
                'Authorization': `JWT ${getState().auth.JWT}`,
                'Access-Control-Allow-Origin' : '*'
              }}, (error, response, body) => {
                handleResponse(error, response, body, () => {
        
                })
            });
          }
          catch (e) {
            throw new Error(e.message || "");
          }
        })
    });
  }
  else {
    dispatch(ui.showSnackbar("Add items to the cart before placing order!"));
  }
}
