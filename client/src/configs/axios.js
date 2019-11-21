import axios from 'axios'

const axiosCreate = axios.create({
  baseURL: 'http://localhost:3000'
})

export default axiosCreate