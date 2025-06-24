'use client'
import { useLogin } from '../LoginContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function RequireLogin({ children }: { children: React.ReactNode }) {
  const { loginData } = useLogin()
  const router = useRouter()

  useEffect(() => {
    if (!loginData) {
      router.replace('/login')
    }
  }, [loginData, router])

  if (!loginData) {
    return null // Or a loading spinner
  }

  return <>{children}</>
}