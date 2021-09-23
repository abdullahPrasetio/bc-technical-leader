import { toast } from 'react-toastify'
import users from 'constants/api/users'

import axios, { setAuthorizationHeader } from './index'

export default function errorHandler(error) {
    if (error) {
        let message
        if (error.response) {
            const originalRequest = error.config
            if (error.response.status === 500)
                message = 'Something went terribly wrong'
            else if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true
                const session = localStorage['BCMICRO:token']
                    ? JSON.parse(localStorage['BCMICRO:token'])
                    : null
                return users
                    .refresh({
                        refresh_token: session.refreshToken,
                        email: session.email,
                    })
                    .then((res) => {
                        if (res.data) {
                            setAuthorizationHeader(res.data.token)
                            localStorage.setItem(
                                'BCMICRO:token',
                                JSON.stringify({
                                    ...session,
                                    token: res.data.token,
                                })
                            )

                            originalRequest.headers.authorization =
                                res.data.token

                            return axios(originalRequest)
                        } else {
                            window.location.href = '/login'
                            localStorage.removeItem('BCMICRO:token')
                        }
                    })
            } else message = error.response.data.message
            if (typeof message === 'string') {
                toast.error(message)
            }
            return Promise.reject(error)
        }
    }
}
