import { ADD_CART, PAYMENT_METHOD, REMOVE_CART, SHIPPING, CLEAR_CART } from "../constranst/cartContranst";
export const addCart = (state = { cartItem: [], shipping: {}, payment: '' }, action) => {
    switch (action.type) {
        case ADD_CART:
            // return { ...state, cartItem: [...state.cartItem, action.payload] }
            const item = action.payload
            const exist = state.cartItem.find((x) => x.product === item.product)
            if (exist) {
                return {
                    ...state, cartItem: state.cartItem.map((idx) => idx.product === exist.product ? item : idx), changeqty: false
                }

            } else {
                return {
                    ...state, cartItem: [...state.cartItem, item], changeqty: true
                }
            }
        case REMOVE_CART:
            return {
                ...state, cartItem: state.cartItem.filter((item) => item.product !== action.payload)
            }
        case SHIPPING:
            return {
                ...state, shipping: action.payload
            }
        case PAYMENT_METHOD:
            return {
                ...state, payment: action.payload
            }
        case CLEAR_CART:
            return {
                ...state, cartItem: []
            }
        
        default:
            return state
    }
}