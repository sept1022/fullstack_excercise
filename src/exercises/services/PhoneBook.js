import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
  const response = axios.get(baseUrl)
  // response.then(response => {
  //   console.log(response.data)
  // })
  return response.then(response => response.data)
}

const create = (obj) => {
  const response = axios.post(baseUrl, obj)
  return response.then(response => response.data)
}

const update = (id, newObject) => {
  const response = axios.put(`${baseUrl}/${id}`, newObject)
  return response.then(response => response.data)
}

const remove = (id) => {
  const response = axios.delete(`${baseUrl}/${id}`)
  return response.then(response => response.data)
}

export {getAll, create, update, remove}
