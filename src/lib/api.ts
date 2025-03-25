import axios from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

const API = axios.create({
  baseURL: BASE_URL
})

API.interceptors.request.use(async (config) => {
  const access = localStorage.getItem('access_token')
  const refresh = localStorage.getItem('refresh_token')

  if (access) {
    const payload = JSON.parse(atob(access.split('.')[1]))
    const isExpired = payload.exp * 1000 < Date.now()

    if (isExpired && refresh) {
      try {
        const response = await axios.post(`${BASE_URL}/auth/token/refresh/`, {
          refresh
        })

        const newAccess = response.data.access
        localStorage.setItem('access_token', newAccess)
        config.headers.Authorization = `Bearer ${newAccess}`
      } catch (err) {
        localStorage.clear()
        window.location.href = '/auth/login'
        return config
      }
    } else {
      config.headers.Authorization = `Bearer ${access}`
    }
  }

  return config
})

export default API