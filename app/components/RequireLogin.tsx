'use client'
import { useLogin } from '../LoginContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function RequireLogin({ children }: { children: React.ReactNode }) {
  const { loginData, setLoginData } = useLogin()
  const router = useRouter()

  useEffect(() => {
    const loginDataFromStorage = localStorage.getItem('loginData')

    if (loginDataFromStorage) {
      try {
        const parsedData = JSON.parse(loginDataFromStorage)
        setLoginData(parsedData)
        console.log('Parsed login data:', parsedData)
      } catch (error) {
        console.error('Error parsing login data:', error)
      }
      return
    }

    router.replace('/login')
  }, [])

  if (!loginData) {
    return null // Or a loading spinner
  }

  return <>{children}</>
}