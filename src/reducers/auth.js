import * as auth from '@/constants/auth'

const initialState = {
  isLoggedIn: false,
  JWT: null,
  isMessageSet: false,
  message: ""
}

const reducer = (state = initialState, action) => {
  const { type } = action;
  if (type === auth.SET_LOGIN) {
    const {
      payload: {
        isLoggedIn, JWT
      }
    } = action
    return {
      ...state,
      JWT,
      isLoggedIn
    }
  }
  if (type === auth.SET_ERRORMESSAGE) {
    return {
      ...state,
      ...action.payload
    }
  }
  return {
    ...state
  }
}

export {
  reducer as auth
}