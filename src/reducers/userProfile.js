import * as userProfile from '@/constants/userProfile'

const initialState = {
  qrCode: null,
  phone: null,
  occupation: null,
  userId: null,
  email: null,
  bitsianId: null,
  name: null,
  isBitsian: null,
  balance: null,
}

const reducer = (state = initialState, action) => {
  const { type } = action;
  if(type === userProfile.SET_PROFILE) {
    const {payload: { 
      qr_code: qrCode,
      phone,
      occupation, 
      user_id: userId, 
      email,
      bitsian_id: bitsianId,
      name, 
      isBitsian
    }} = action

    const newState =  {
      ...state,
      qrCode,
      phone,
      occupation,
      userId,
      email,
      bitsianId,
      name,
      isBitsian
    }
    return newState;
  }
  if(type === userProfile.UPDATE_BALANCE) { 
    const { balance } = action.payload;
    return {
      ...state, 
      balance
    }
  }
  if(type === userProfile.UPDATE_TOKENS) { 
    const { tokens } = action.payload;
    return {
      ...state, 
      tokens
    }
  }
  if(type === userProfile.UPDATE_QR) { 
    const { qrCode } = action.payload;
    return {
      ...state, 
      qrCode
    }
  }
  return {
    ...state
  }
}

export {
  reducer as userProfile
}