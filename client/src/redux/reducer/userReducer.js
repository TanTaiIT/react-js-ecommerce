import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, SIGN_UP_FAIL, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, USER_DETAIL_FAIL, USER_DETAIL_REQUEST, USER_DETAIL_RESET, USER_DETAIL_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_RESET, USER_UPDATE_SUCCESS } from "../constranst/userContranst";

export const signin = (state = { user: {} }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
            return {
                ...state, loading: true
            }
        case LOGIN_SUCCESS:
            return {
                ...state, loading: false, user: action.payload
            }
        case LOGIN_FAIL:
            return {
                ...state, loading: false, error: action.payload
            }
        case SIGN_UP_REQUEST:
            return {
                ...state, loading: true
            }
        case SIGN_UP_SUCCESS:
            return {
                ...state, loading: false, user: action.payload
            }
        case SIGN_UP_FAIL:
            return {
                ...state, loading: false, error: action.payload
            }
        default:
            return state
    }
}

export const userDetailReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_DETAIL_REQUEST:
            return { loading: true }
        case USER_DETAIL_SUCCESS:
            return { loading: false, user: action.payload }
        case USER_DETAIL_FAIL:
            return { loading: false, error: action.payload }
        case USER_DETAIL_RESET:
            return { user: {} }
        default:
            return state
    }
}

export const userUpdate = (state = { user: {} }, action) => {
    switch (action.type) {
        case USER_UPDATE_REQUEST:
            return { loading: true }
        case USER_UPDATE_SUCCESS:
            return { loading: true, success: true, userInfo: action.payload }
        case USER_UPDATE_FAIL:
            return { loading: true, error: action.payload }
        default:
            return state
    }
}
