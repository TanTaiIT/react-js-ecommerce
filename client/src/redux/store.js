import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { addCart } from './reducer/cartReducer'
import { signin, userDetailReducer, userUpdate } from './reducer/userReducer'
import { create_order, orderDetail, orderList, orderPay } from './reducer/orderReducer'



const cartItemStorage = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
const userStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const shipStorage = localStorage.getItem('ship') ? JSON.parse(localStorage.getItem('ship')) : null
const paymentStorage = localStorage.getItem('method') ? JSON.parse(localStorage.getItem('method')) : ''
const initialState = {
    cart: {
        cartItem: cartItemStorage,
        shipping: shipStorage,
        payment: paymentStorage
    },
    users: {
        user: userStorage
    }
}
const reducer = combineReducers({
    cart: addCart,
    users: signin,
    order: create_order,
    orderDetail: orderDetail,
    orderPay: orderPay,
    orderList: orderList,
    userDetail: userDetailReducer,
    userUpdate: userUpdate

})
const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))
export default store