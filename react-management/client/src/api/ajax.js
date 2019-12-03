/*
 * @Description: 
 * @Version: 2.0
 * @Autor: Darren
 * @Date: 2019-11-21 14:42:48
 * @LastEditors: Darren
 * @LastEditTime: 2019-11-21 15:13:16
 */
import axios from 'axios'
import { message } from 'antd'
import qs from 'qs'
// 添加请求拦截器
axios.interceptors.request.use(function(config) {
  const { method, data } = config
  // 处理post请求
  // a=1&b=2
  // if (method.toLowerCase() === 'post' && typeof data === 'object') {
  //  config.data = qs.stringify(data)
  // }
  return config
})

// 响应拦截器
axios.interceptors.response.use(function(response) {
  return response.data
}, function(error) {
  message.error('请求错误' + error.message);
  return new Promise(() => {})
})

export default axios