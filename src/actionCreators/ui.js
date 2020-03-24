import * as ui from '@/constants/ui'

export const showLoader = () => ({
  type: ui.SHOW_LOADER
})

export const hideLoader = () => ({
  type: ui.HIDE_LOADER
})

export const showSnackbar = message => {
  return {
    type: ui.SHOW_SNACKBAR,
    payload: { message }
  }
}

export const hideSnackbar = () => ({
  type: ui.HIDE_SNACKBAR,
  payload: {
    message: ""
  }
})