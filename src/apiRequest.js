import axios from 'axios'
import dotenv from 'dotenv'
import Cookies from 'universal-cookie'

dotenv.config()
const cookie = new Cookies()

const BASE_URL = process.env.REACT_APP_PUBLIC_URL
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYTFmZDFmY2RmZTEzOTA0NWM5YjY3MyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzODM1NzE2NiwiZXhwIjoxNjM4NjE2MzY2fQ.Mz9_PfRzTPgQikwrtOsSJeI9nkJNkMqD5Slv_2KbQD8"

export const publicRequest = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Authorization: cookie.get('shopKlassToken')
    },
    withCredentials: "include",
    
})

export const imgRequest = axios.create({
    baseUrl: BASE_URL,
    headers: {
        "Content-Type": "multipart/form-data"
    }
})

// export const userRequest = axios.create({
//     baseURL: BASE_URL,
//     header: {authorization: token}
// })