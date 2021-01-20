import axios from 'axios'
const baseUrl = '/api/persons'

export const getAllPersons = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data);
}

export const createPerson = newObject => {
    const request = axios.post(baseUrl, newObject);
    return request.then(res => {
        if (res.status === 200) {
            return res.data;
        } else {
            return res.status;
        }
    })
}

export const deletePersonFromDb = id => {
    const url = baseUrl.concat(`/${id}`);
    const request = axios.delete(url);
    return request.then(res => res.status);
}

export const updatePerson = (id, newObject) => {
    const url = baseUrl.concat(`/${id}`);
    const request = axios.put(url, newObject);
    return request.then(res => res.data);
}