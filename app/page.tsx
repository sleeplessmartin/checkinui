'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLogin } from './LoginContext'

export default function Home() {
  const router = useRouter()
  const { loginData } = useLogin()

  useEffect(() => {
    if (!loginData) {
      router.push('/login')
    }
  }, [loginData, router])

  return null
}
