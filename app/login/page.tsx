'use client'
import React, { useState, useEffect } from 'react'
import { useLogin } from '../LoginContext'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const { setLoginData } = useLogin()
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    // Reset login data on component mount
    console.log('Resetting login data')
    setLoginData(null)
  }, [setLoginData])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)
    try {
      const res = await fetch('http://localhost:5210/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ user_id: userId, password }),
      })
      await new Promise(res => setTimeout(res, 3000)) // Simulate delay
      const data = await res.json()
      setLoginData(data)
      router.replace('/dashboard') // Redirect to check-in page with a dummy ID
    } catch (err: any) {
      console.log(err.message)
      setError(err.message || 'An error occurred during login')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-4 max-w-xs mx-auto mt-20">
      <input
        type="text"
        placeholder="User ID"
        value={userId}
        onChange={e => setUserId(e.target.value)}
        className="border p-2"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="border p-2"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:gb-blue-600">
        {isLoading ? <span className="loading loading-spinner loading-md"></span> : "Login"}
      </button>
      {error && <div className="text-red-500">{error}</div>}
    </form>
  )
}