import axios from 'axios'
const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:3001/api/notes"
console.log(baseUrl)

const getAll = () => {
  const fake = {
    id: 10000,
    content: 'this is not saved to server',
    important: true,
  }

  const response = axios.get(baseUrl)
  return response.then((response) => response.data.concat(fake))
}

const create = (newObject) => {
  const response = axios.post(baseUrl, newObject)
  return response.then((response) => response.data)
}

const update = (id, newObject) => {
  const response = axios.put(`${baseUrl}/${id}`, newObject)
  return response.then((response) => response.data)
}

export default { getAll, create, update }
