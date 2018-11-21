import axios from '../../components/interceptor'
import axioss from 'axios'
export default {
  login: async (param) => {
    let rest = await axios.post(`/api/users/actions/login`, param)
    return rest.data
  },
  queryUserList: async ({pageIndex, pageSize}, {userName}, groupId) => {
    let rest = await axios.get(`/api/users?pageIndex=${pageIndex}&pageSize=${pageSize}&userName=${userName}&groupId=${groupId}`)
    return rest.data
  },
  create: async (userform) => {
    let rest = await axios.post('/api/users', userform)
    return rest.data
  },
  remove: async (id) => {
    let resp = await axioss.delete(`/api/users/${id}`)
    return resp.data
  },
  update: async (userform) => {
    let rest = await axios.put('/api/users', userform)
    return rest.data
  }
}
