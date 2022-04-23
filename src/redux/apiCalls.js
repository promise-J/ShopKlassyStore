import { publicRequest } from "../apiRequest"
import { loginFailure, loginStart, loginSuccess, logoutFailure, logoutStart, logoutSuccess } from "./userRedux"

export const login = async(dispatch, user)=>{
    dispatch(loginStart())
    try {
        const res = await publicRequest.post('/auth/login', user)
        dispatch(loginSuccess(res.data))
    } catch (error) {
        dispatch(loginFailure())
    }
}

export const fetchUser = async()=>{
    const res = await publicRequest.get('/auth/info')
    return res.data.user
}

export const register = async(dipatch, user)=>{
    try {
        const res = await publicRequest.post('/auth/register', user)
        return res
    } catch (error) {
        return error.response
    }
}

export const logout = async(dispatch)=>{
    dispatch(logoutStart())
    try {
        await publicRequest.get("/auth/logout")
        dispatch(logoutSuccess())
    } catch (error) {
        dispatch(logoutFailure())
    }
}