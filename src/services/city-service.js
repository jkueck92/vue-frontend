import axios from 'axios'

const API_URL = 'http://localhost:8001/api/cities'

class CityService {
  getAll () {
    return axios.get(API_URL)
  }

  getById (id) {
    return axios.get(API_URL + '/' + id)
  }

  save (city) {
    return axios.post(API_URL, city)
  }

  update (city) {
    return axios.put(API_URL + '/' + city.id, city)
  }

  delete (city) {
    return axios.delete(API_URL + '/' + city.id)
  }
}

export default new CityService()
