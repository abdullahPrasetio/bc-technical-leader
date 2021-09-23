import axios from 'configs/axios'

const users = {
    login: (credentials) =>
        axios.post('/users/v1/user/technical-leader/login', credentials),
    refresh: (credentials) =>
        axios.post('/refresh-tokens', {
            refresh_token: credentials.refresh_token,
            email: credentials.email,
        }),
    update: (data) => axios.put(`/users/${data.id}`, data),
    logout: () => axios.post('/users/v1/user/logout'),

    // getUsers: (options = { params: {} }) =>
    //     axios.get('/users/get-users', options),
    // getAll: (options = { params: {} }) => axios.get('/users', options),
    // details: (id) => axios.get(`/users/${id}`),
}
export default users
