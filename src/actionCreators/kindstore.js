import request from 'request'

import * as api from '@/constants/api'
import * as kindstore from '@/constants/kindstore';
import * as ui from '@/actionCreators/ui'
import { handleResponse } from '@/utils'

export const getKindStores = () => (dispatch, getState) => {
	dispatch(ui.showLoader());
	request({
		method: 'GET',
		url: api.KIND_STORE,
		headers: {
			'Content-Type': 'application/json',
			'X-Wallet-Token': api.WALLET_TOKEN,
			'Authorization': `JWT ${getState().auth.JWT}`,
		}
	}, (error, response, body) => {
		handleResponse(error, response, body, () => {
			try {
				body = JSON.parse(body);
				dispatch(setKindStores(body));
			} catch (e) {
				throw new Error(e.message || "");
			}
		})
	});
}

export const setKindStores = payload => ({
	type: kindstore.SET_STORES,
	payload
})