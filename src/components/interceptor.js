import axios from 'axios'
import {Message} from 'element-ui'

axios.interceptors.request.use(config => {
  // ==========  所有请求之前都要执行的操作  ==============
  return config
}, err => {
  // ==================  错误处理  ====================
  Message.error({message: '请求超时!'})
  return Promise.resolve(err)
})

axios.interceptors.response.use(response => {
// ==============  所有请求完成后都要执行的操作  ==================
  // 第二种方式，仅对200和error状态处理
  if (response.status === 200) {
    return response
  }
}, error => {
  if (error.response.status === 500) {
    Message.error({message: error.response.data.msg})
  }
  return Promise.resolve(error.response)
})

export default {
  post (url, data) {
    return axios({
      method: 'post',
      url,
      data: data,
      timeout: 30000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
      }
    })
  },
  get (url, params) {
    return axios({
      method: 'get',
      url,
      params,
      timeout: 30000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
  },
  //  PUT 方法封装
  put (url, params) {
    return axios({
      method: 'put',
      url: url,
      data: params,
      timeout: 30000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
      }
    })
  },
  //  DELETE 方法封装
  delete (url, params) {
    return axios({
      method: 'delete',
      url,
      params,
      timeout: 30000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
  }
}
