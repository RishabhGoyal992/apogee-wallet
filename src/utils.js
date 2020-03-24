import * as ui from '@/actionCreators/ui'
import { UNKNOWN_ERROR } from '@/constants/ui'
import store from '@/store.js'

const dispatch = store.dispatch;

export const handleResponse = (error, response, body, cb) => {
  dispatch(ui.hideLoader());
  if (error || !response) {
    dispatch(ui.showSnackbar(UNKNOWN_ERROR));
  }
  else if (response.statusCode === 200) {
    try {
      cb();
    } catch (e) {
      dispatch(ui.showSnackbar(UNKNOWN_ERROR));
    }
  }
  else {
    try {
      body = JSON.parse(body)
      if(!body.display_message) throw new Error("No display message");
      dispatch(ui.showSnackbar(body.display_message));
    } catch (e) {
      dispatch(ui.showSnackbar(UNKNOWN_ERROR));
    }
  }
}