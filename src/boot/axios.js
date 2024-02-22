import { boot } from 'quasar/wrappers'
import axios from 'axios'
import { getStorage } from 'src/utils/storage';
import { Notify } from 'quasar'

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({
  baseURL: process.env.API,
  timeout: 5000 // request timeout
})

// request interceptor
api.interceptors.request.use(
  config => {
    // do something before request is sent
    const hasToken = getStorage({ name:'accessToken' })
    if (hasToken) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = hasToken
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
api.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // 4000 一般错误
    if (res.code === 4000) {
      Notify.create({
        message: res.msg || 'Error',
        type: 'error',
        position: 'center'
      })

      return Promise.reject(new Error(res.message || 'Error'))
    } else if (res.code === 4001) {
      Notify.create({
        message: res.msg || 'Error',
        type: 'error',
        position: 'center'
      })
      delStorage({
        name: 'accessToken',
        type: 'session'
      })
      // return Promise.reject(new Error(res.message || 'Error'))
      location.reload()
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Notify.create({
      message: error.message,
      type: 'error',
      position: 'center'
    })
    return Promise.reject(error)
  }
)

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api }
