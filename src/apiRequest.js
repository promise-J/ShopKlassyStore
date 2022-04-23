import axios from 'axios'

const BASE_URL = process.env.REACT_APP_PUBLIC_URL
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYTFmZDFmY2RmZTEzOTA0NWM5YjY3MyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzODM1NzE2NiwiZXhwIjoxNjM4NjE2MzY2fQ.Mz9_PfRzTPgQikwrtOsSJeI9nkJNkMqD5Slv_2KbQD8"

export const publicRequest = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: "include",
    
})

// export const userRequest = axios.create({
//     baseURL: BASE_URL,
//     header: {authorization: token}
// })