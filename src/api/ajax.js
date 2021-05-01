import axios from 'axios'
import { message } from 'antd'

export default function ajax(url, data = {}, type = 'GET') {
  return new Promise((resolve, reject) => {
    let promise
    if (type === 'GET') {
      // get请求
      promise = axios.get(url, { params: data }) // 这个本来就是一个promise对象
    } else {
      promise = axios.post(url, data)
    }
    promise
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        message.error('请求出错了: ' + error.message)
      })
  })
}
