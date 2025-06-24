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
  const [loginData, setLoginData] = useState<LoginData | null>(null)

  return (
    <LoginContext.Provider value={{ loginData, setLoginData }}>
      {children}
    </LoginContext.Provider>
  )
}