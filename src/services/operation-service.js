import axios from 'axios'

const API_URL = 'http://localhost:8001/api/operations'

class OperationService {
  getAll () {
    return axios.get(API_URL)
  }

  getById (id) {
    return axios.get(API_URL + '/' + id)
  }

  save (operation) {
    return axios.post(API_URL, operation)
  }

  update (operation) {
    return axios.put(API_URL + '/' + operation.id, operation)
  }

  delete (operation) {
    return axios.delete(API_URL + '/' + operation.id)
  }
}

export default new OperationService()
