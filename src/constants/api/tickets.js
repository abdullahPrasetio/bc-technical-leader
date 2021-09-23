import axios from 'configs/axios'

const tickets = {
    getAll: (options = { params: {} }) =>
        axios.get('/tickets/v1/technical-leader/', options),
    get: (id) => axios.get(`/tickets/v1/technical-leader/${id}`),
    reply: (form, id) =>
        axios.post(`/tickets/v1/technical-leader/reply/${id}`, form),
}

export default tickets
