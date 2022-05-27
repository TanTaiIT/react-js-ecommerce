import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_DETAIL_FAIL, ORDER_DETAIL_REQUEST, ORDER_DETAIL_SUCCESS, ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_RESET, ORDER_LIST_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_RESET, ORDER_PAY_SUCCESS } from "../constranst/orderContranst"
import axios from 'axios'
export const create_order = (order) => async (dispatch, getState) => {
    dispatch({ type: ORDER_CREATE_REQUEST })
    try {
        const cus = getState().users
        const { user } = cus
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`
            }
        }
        const { data } = await axios.post('/api/order', order, config)
        dispatch({ type: ORDER_CREATE_SUCCESS, payload: data })
    } catch (error) {
        const message = error.response.data.message ? error.response.data.message : error.message
        dispatch({ type: ORDER_CREATE_FAIL, payload: message })
    }
}

export const getOrder = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_DETAIL_REQUEST })
        const {
            users: { user },
        } = getState()
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`
            }
        }
        const { data } = await axios.get(`/api/order/${id}`, config)
        dispatch({ type: ORDER_DETAIL_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: ORDER_DETAIL_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }


}

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_PAY_REQUEST })
        const {
            users: { user }
        } = getState()
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`
            }
        }
        const { data } = await axios.put(`/api/order/${orderId}/paid`, paymentResult, config)
        dispatch({ type: ORDER_PAY_SUCCESS })


    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}


export const listOrder = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDER_LIST_REQUEST })
        const {
            users: { user }
        } = getState()
        const config = {
            headers: {
                "Content-Type": "application",
                Authorization: `Bearer ${user.token}`
            }
        }
        const { data } = await axios.get('/api/order', config)
        dispatch({ type: ORDER_LIST_SUCCESS, payload: data })


    } catch (error) {
        dispatch({
            type: ORDER_PAY_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}