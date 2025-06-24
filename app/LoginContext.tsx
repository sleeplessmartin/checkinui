'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'
import type { LoginData } from '../types/global'

type LoginContextType = {
  loginData: LoginData | null
  setLoginData: (data: LoginData) => void
}

const LoginContext = createContext<LoginContextType | undefined>(undefined)

export function useLogin() {
  const ctx = useContext(LoginContext)
  if (!ctx) throw new Error('useLogin must be used within LoginProvider')
  return ctx
}

export function LoginProvider({ children }: { children: React.ReactNode }) {
  const [loginData, setLoginDataState] = useState<LoginData | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('loginData')
      if (stored) setLoginDataState(JSON.parse(stored))
    }
  }, [])

  const setLoginData = (data: LoginData | null) => {
    setLoginDataState(data)
    if (typeof window !== 'undefined') {
      if (data) {
        localStorage.setItem('loginData', JSON.stringify(data))
      } else {
        localStorage.removeItem('loginData')
      }
    }
  }

  return (
    <LoginContext.Provider value={{ loginData, setLoginData }}>
      {children}
    </LoginContext.Provider>
  )
}