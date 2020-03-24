import * as profshows from '@/constants/profshows'
const initialState = {
  allProfshowsData: {},
  showsCart: {
    individual: {},
    combos: {}
  },
  myShows: {}
}

const reducer = (state = initialState, action) => {
  const { type } = action;
  if(type === profshows.SET_ALL_PROFSHOWS) {
    const { payload } = action
    return {
      ...state,
      allProfshowsData: payload
    }
  }
  else if (type === profshows.INC_COMBO_QTY) {
    let newState;
    let id = action.id;
    if (state.showsCart.combos[id]) {
      newState = {
        ...state,
        showsCart: {
          ...state.showsCart,
          combos: {
            ...state.showsCart.combos,
            [id]: state.showsCart.combos[id] + 1
          }
        }
      }
    }
    else {
      newState = {
        ...state,
        showsCart: {
          ...state.showsCart,
          combos: {
            ...state.showsCart.combos,
            [id]: 1
          }
        }
      }
    }

    return newState;
  }
  else if (type === profshows.DEC_COMBO_QTY) {
    let newState = {...state}, id = action.id;
    if (state.showsCart.combos[id] && state.showsCart.combos[id] > 0) {
      newState = {
        ...state,
        showsCart: {
          ...state.showsCart,
          combos: {
            ...state.showsCart.combos,
            [id]: state.showsCart.combos[id] - 1
          }
        }
      }

      if (newState.showsCart.combos[id] === 0) {
        delete newState.showsCart.combos[id];
      }
    }

    return newState;
  }

  else if (type === profshows.INC_SHOW_QTY) {
    let newState;
    let id = action.id;
    if (state.showsCart.individual[id]) {
      newState = {
        ...state,
        showsCart: {
          ...state.showsCart,
          individual: {
            ...state.showsCart.individual,
            [id]: state.showsCart.individual[id] + 1
          }
        }
      }
    }
    else {
      newState = {
        ...state,
        showsCart: {
          ...state.showsCart,
          individual: {
            ...state.showsCart.individual,
            [id]: 1
          }
        }
      }
    }

    return newState;
  }
  else if (type === profshows.DEC_SHOW_QTY) {
    let newState = {...state}, id = action.id;
    if (state.showsCart.individual[id] && state.showsCart.individual[id] > 0) {
      newState = {
        ...state,
        showsCart: {
          ...state.showsCart,
          individual: {
            ...state.showsCart.individual,
            [id]: state.showsCart.individual[id] - 1
          }
        }
      }

      if (newState.showsCart.individual[id] === 0) {
        delete newState.showsCart.individual[id];
      }
    }

    return newState;
  }

  else if (type === profshows.SET_MY_PROFSHOWS) {
    let myShows = action.payload;
    return {
      ...state,
      myShows
    }
  }

  else if (type === profshows.SHOWS_CLEAR) {
    return {
      ...state,
      showsCart: {
        individual: {},
        combos: {}
      }
    }
  }

  return { ...state };
}

export {
  reducer as profshows
}