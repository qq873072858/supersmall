import axios from 'axios'

export function request(config) {
  const instance = axios.create({
    // baseURL: 'http://123.207.32.32:8000',
    baseURL: 'http://152.136.185.210:7878/api/hy66',
    timeout: 5000
  })

  instance.interceptors.request.use(
    config => {
      return config
    },
    err => {
      return err
    }
  )
  instance.interceptors.response.use(
    res => {
      return res
    },
    err => {
      return err
    }
  )

  return instance(config)
}
