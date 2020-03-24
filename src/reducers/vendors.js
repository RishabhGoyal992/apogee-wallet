import * as vendors from '@/constants/vendors'

const intitialState = {}
const reducer = (state = intitialState, action) => {
  const { type } = action;
  if(type === vendors.SET_VENDORS) {
    return {
      ...state, 
      vendors: action.payload 
    }
  }

  else if (type === vendors.SET_ITEMS) {
    return {
      ...state,
      items: action.payload
    }
  }

  else if (type === vendors.SET_CURR_VENDOR) {
    return {
      ...state,
      name: action.name,
      id: action.id,
    }
  }

  return {
    ...state
  }
}

export {
  reducer as vendors
}