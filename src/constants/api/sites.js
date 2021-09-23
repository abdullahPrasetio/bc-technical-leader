import axios from 'configs/axios'

const sites = {
    getAll: (options = { params: {} }) => axios.get('/sites', options),
    get: (id) => axios.get(`/sites/${id}`),
    update: (form) => axios.put(`/sites/${form.id}`, form),
    create: (form) => axios.post(`/sites`, form),
    delete: (id) => axios.delete(`/sites/${id}`),
}

export default sites
