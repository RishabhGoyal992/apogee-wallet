import * as orders from '@/constants/orders'

const initialState = {
  pastTransactions: [],
  orders: []
}

const reducer = (state = initialState, action) => {
  const { type } = action;

  if (type === orders.SET_PAST_TRANSACTIONS) {
    return {
      ...state,
      pastTransactions: action.payload
    }
  }

  else if (type === orders.SET_ORDERS) {
    return {
      ...state,
      orders: action.payload
    }
  }

  else if (type === orders.UPDATE_ORDER_STATUSES) {
    const statuses = action.payload
    const newState = JSON.parse(JSON.stringify(state.orders))
    for (const shellName in statuses) {
      for (const orderName in statuses[shellName]) {
        // console.log(shellName, orderName)
        const newStatus = statuses[shellName][orderName];
        const shellId = Number(shellName.slice(shellName.indexOf(' - ') + 3))
        const orderId = Number(orderName.slice(orderName.indexOf(' - ') + 3))
        // console.log(shellId, orderId)
        // console.log(newState)
        const shell = newState.find(({id}) => id === shellId)
        // console.log(shell)
        if(shell){
          const order = shell.orders.find(({id}) => id === orderId)
          if(order) {
            // console.log(order)
            // console.log(newStatus)
            order.status = newStatus;
          }
        }
      }
    }
    return {
      ...state,
      orders: newState
    };
  }

  return {
    ...state
  }
}

export {
  reducer as orders
}