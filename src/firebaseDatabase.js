import firebase from "firebase/app"
import { updateBalance } from "@/actionCreators/userProfile"
import { updateTokens } from "@/actionCreators/userProfile"
import { updateOrderStatuses } from "@/actionCreators/orders"

const getUserPath = (isBitsian, id) => {
	if (id === null || id === undefined) return;

	const pre = isBitsian ? 'bitsian' : 'participant'
  const userPath = `users/${pre} - ${id}`;
	return userPath
}

export const setupRealtimeBalance = (isBitsian, id, dispatch) => {
	const userPath = getUserPath(isBitsian, id);
	const database = firebase.database();

	const balancePath = `${userPath}/total_balance`
  const balanceRef = database.ref(balancePath)
	balanceRef.on('value', snap => {
    const balance = snap.val()

		dispatch(updateBalance(balance));
	})
}

export const setupRealtimeOrders = (isBitsian, id, dispatch) => {
	const userPath = getUserPath(isBitsian, id);
	const database = firebase.database();

	const ordersPath = `${userPath}/orders`
	const ordersRef = database.ref(ordersPath)
	ordersRef.on('value', snap => {
		const statuses = snap.val()
		dispatch(updateOrderStatuses(statuses))
	})

}

export const setupRealtimeTokens = (isBitsian, id, dispatch) => {
	const userPath = getUserPath(isBitsian, id);
	const database = firebase.database();

	const tokensPath = `${userPath}/tokens`
	const tokensRef = database.ref(tokensPath)
	tokensRef.on('value', snap => {
		const tokens = snap.val()
		dispatch(updateTokens(tokens))
	})

}