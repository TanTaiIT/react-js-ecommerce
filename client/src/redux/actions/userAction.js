import axios from "axios"
import { LOGIN_FAIL, LOGIN_REQUEST, LOGIN_SUCCESS, SIGN_UP_FAIL, SIGN_UP_REQUEST, SIGN_UP_SUCCESS, USER_DETAIL_FAIL, USER_DETAIL_REQUEST, USER_DETAIL_RESET, USER_DETAIL_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_RESET, USER_UPDATE_SUCCESS } from "../constranst/userContranst"

export const signin = (info) => async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST })
    try {
        const { data } = await axios.post(`/api/user/login`, info)
        dispatch({ type: LOGIN_SUCCESS, payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        const message = error.response.data.message ? error.response.data.message : error.message
        dispatch({ type: LOGIN_FAIL, payload: message })
    }
}
export const signup = (info) => async (dispatch) => {
    dispatch({ type: SIGN_UP_REQUEST })
    try {
        const { data } = await axios.post('/api/user/register', info)
        dispatch({ type: SIGN_UP_SUCCESS, payload: data })
        localStorage.setItem("userInfo", JSON.stringify(data))
    } catch (error) {
        const message = error.response.data.message ? error.response.data.message : error.message
        dispatch({ type: SIGN_UP_FAIL, payload: message })
    }
}

export const userDetail = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAIL_REQUEST
        })
        const {
            users: { user },
        } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${user.token}`

            }
        }

        const { data } = await axios.get(`/api/user/${id}`, config)

        dispatch({ type: USER_DETAIL_SUCCESS, payload: data })
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        if (message === "Not authorization, not token") {
            // dispatch(userLogout())
        }
        dispatch({ type: USER_DETAIL_FAIL, payload: message })
    }


}

export const updateProfile = (info) => async (dispatch, getState) => {
    try {
        dispatch({ type: USER_UPDATE_REQUEST })
        const {
            users: { user },
        } = getState()
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`
            }

        }

        const { data } = await axios.put(`/api/user/profile`, info, config)
        dispatch({ type: USER_UPDATE_SUCCESS, payload: data })
        // dispatch({ type: USER_LOGIN_SUCCESS, payload: data })
        localStorage.setItem("userInfo", JSON.stringify(data))
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        if (message === "Not authorization, not token") {
            // dispatch(userLogout())
        }
        dispatch({ type: USER_UPDATE_FAIL, payload: message })
    }
}