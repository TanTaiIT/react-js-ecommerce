import { RESET_ORDER } from "../constranst/cartContranst";
import { ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_RESET, ORDER_DETAIL_REQUEST, ORDER_DETAIL_SUCCESS, ORDER_DETAIL_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_RESET, ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_RESET, ORDER_LIST_SUCCESS } from "../constranst/orderContranst";

export const create_order = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return {
                loading: true
            }
        case ORDER_CREATE_SUCCESS:
            return {
                loading: false, success: true, order: action.payload
            }
        case ORDER_CREATE_FAIL:
            return {
                loading: false, success: false, error: action.payload
            }
        case ORDER_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const orderDetail = (state = { loading: true }, action) => {
    switch (action.type) {
        case ORDER_DETAIL_REQUEST:
            return { ...state, loading: true }
        case ORDER_DETAIL_SUCCESS:
            return { loading: false, order: action.payload }
        case ORDER_DETAIL_FAIL:
            return { loading: false, error: action.payload }
        case RESET_ORDER:
            return { ...state, order: [] }
        default:
            return state
    }
}

export const orderPay = (state = {}, action) => {
    switch (action.type) {
        case ORDER_PAY_REQUEST:
            return {
                loading: true
            }
        case ORDER_PAY_SUCCESS:
            return {
                loading: false, success: true
            }
        case ORDER_PAY_FAIL:
            return { loading: false, error: action.payload }
        case ORDER_PAY_RESET:
            return {}
        default:
            return state

    }
}

export const orderList = (state = {}, action) => {
    switch (action.type) {
        case ORDER_LIST_REQUEST:
            return {
                loading: true
            }
        case ORDER_LIST_SUCCESS:
            return {
                loading: false, order: action.payload
            }
        case ORDER_LIST_FAIL:
            return { loading: false, error: action.payload }
        case ORDER_LIST_RESET:
            return { order: [] }
        default:
            return state

    }
}