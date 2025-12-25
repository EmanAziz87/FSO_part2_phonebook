import axios from 'axios';

// const baseUrl = import.meta.env.VITE_BACKEND_API
const baseUrl = 'http://localhost:3000'

const getAll = () => {
    const request = axios.get(`${baseUrl}/api/persons`)
    return request.then(response => response.data)
}

const create = (newPerson) => {
    const request = axios.post(`${baseUrl}/api/persons`, newPerson)
    return request.then(response => response.data)
}

const destroy = (id) => {
    const request = axios.delete(`${baseUrl}/api/persons/${id}`)
    return request.then(response => response)
}

const update = (id, updatedPerson) => {
    const request = axios.put(`${baseUrl}/api/persons/${id}`, updatedPerson)
    return request.then(response => response.data)
}

export default {getAll, create, destroy, update}