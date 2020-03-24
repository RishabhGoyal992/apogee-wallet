import * as ui from '@/constants/ui'

const initialState = {
  isLoaderShown: false,
  isSnackbarShown: false,
  snackbarMessage: ""
}

const reducer = (state = initialState, action) => {
  const { type } = action;
  if(type === ui.SHOW_LOADER){
    return {
      ...state,
      isLoaderShown: true
    }
  }
  else if(type === ui.HIDE_LOADER){
    return {
      ...state,
      isLoaderShown: false
    }
  }
  else if(type === ui.SHOW_SNACKBAR){
    return {
      ...state,
      isSnackbarShown: true,
      snackbarMessage: action.payload.message
    }
  }
  else if(type === ui.HIDE_SNACKBAR){
    return {
      ...state,
      isSnackbarShown: false
    }
  }
  return { ...state };
}

export {
  reducer as ui
}