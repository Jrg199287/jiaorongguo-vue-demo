import axios from '../../components/interceptor'
export default {
  roleList: async (parentId) => {
    let rest = await axios.get(`/api/orgs/actions/query?parentId=${parentId}`)
    return rest.data
  },
  roles: async () => {
    let rest = await axios.get(`/api/orgs/actions/query?parentId`)
    return rest.data
  },
  create: async (form) => {
    let rest = await axios.post('/api/orgs', form)
    return rest.data
  },
  remove: async (id) => {
    let rest = await axios.delete(`/api/orgs/${id}`)
    return rest.data
  },
  update: async (editdata) => {
    let rest = await axios.put('/api/orgs', editdata)
    return rest.data
  }
}
