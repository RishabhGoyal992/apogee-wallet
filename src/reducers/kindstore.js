import * as kindstore from '@/constants/kindstore'

const initialState = {}
const reducer = (state = initialState, action) => {
    const { type } = action;
    if (type === kindstore.SET_STORES) {
        return {
            ...state,
            stores: action.payload
        }
    }

    return {
        ...state
    }
}

export {
    reducer as kindstore
}