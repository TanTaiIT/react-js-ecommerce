import axios from "axios"
import { ADD_CART, PAYMENT_METHOD, REMOVE_CART, SHIPPING, RESET_ORDER, CLEAR_CART } from "../constranst/cartContranst"
export const add_cart = (id, qty) => async (dispatch, getState) => {
    // dispatch({ type: ADD_CART, payload: item })
    const { data } = await axios.get(`/api/product/${id}`)
    dispatch({
        type: ADD_CART, payload: {
            product: data._id,
            name: data.name,
            price: data.price,
            image: data.image,
            countInStock: data.countInStock,
            quantity: qty
        }
    })
    localStorage.setItem('cart', JSON.stringify(getState().cart.cartItem))
}
export const remove_cart = (id) => async (dispatch, getState) => {
    dispatch({ type: REMOVE_CART, payload: id })
    localStorage.setItem('cart', JSON.stringify(getState().cart.cartItem))
}

export const shipping = (data) => async (dispatch) => {
    dispatch({ type: SHIPPING, payload: data })
    localStorage.setItem('ship', JSON.stringify(data))
}
export const payment_method = (method) => async (dispatch) => {
    dispatch({ type: PAYMENT_METHOD, payload: method })
    localStorage.setItem('method', JSON.stringify(method))
}
export const clear = () => (dispatch) => {
    localStorage.removeItem('method')
    localStorage.removeItem('cart')
    localStorage.removeItem('ship')
    dispatch({ type: RESET_ORDER })
    dispatch({ type: CLEAR_CART })

}