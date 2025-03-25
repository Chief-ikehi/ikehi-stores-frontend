'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import API from '@/lib/api'

type User = {
  email: string
  full_name?: string
}

type AuthContextType = {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, full_name?: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | null>(null)

export const useAuth = () => useContext(AuthContext)!

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('access_token')
    const userData = localStorage.getItem('user')
    if (token && userData) {
      setUser(JSON.parse(userData))
      setIsAuthenticated(true)
    }
  }, [])

  const login = async (email: string, password: string) => {
    const res = await API.post('/auth/login/', { email, password })
    const { access, refresh } = res.data.tokens

    localStorage.setItem('access_token', access)
    localStorage.setItem('refresh_token', refresh)

    setUser({ email })
    localStorage.setItem('user', JSON.stringify({ email }))
    setIsAuthenticated(true)
    router.push('/products')
  }

  const register = async (email: string, password: string, full_name?: string) => {
    const res = await API.post('/auth/register/', { email, password, full_name })
    const { access, refresh } = res.data.tokens

    localStorage.setItem('access_token', access)
    localStorage.setItem('refresh_token', refresh)

    setUser({ email })
    localStorage.setItem('user', JSON.stringify({ email }))
    setIsAuthenticated(true)
    router.push('/products')
  }

  const logout = () => {
    localStorage.clear()
    setUser(null)
    setIsAuthenticated(false)
    router.push('/auth/login')
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}