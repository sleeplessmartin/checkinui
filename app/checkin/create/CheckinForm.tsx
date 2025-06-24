'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLogin } from '../../LoginContext'
import { FaRegMeh, FaRegSmile, FaRegFrown, FaSmile, FaFrown } from 'react-icons/fa'

export default function CheckinForm() {
  const { loginData } = useLogin()
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('Neutral')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/checkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: loginData.user_id,
          status,
          message,
          created_by_id: loginData.user_id,
        }),
      })
      if (res.ok) {
        router.push('/dashboard')
      }
    } catch (err: any) {
      alert('Error submitting check-in')
    }
    setMessage('')
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md bg-base-200 p-6 rounded-box shadow">
      <div className="mb-4">
            <label className="block mb-2 font-semibold">Mood</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                        type="button"
                        className={`btn w-full ${status === 'Sad' ? 'btn-active btn-error' : ''}`}
                        onClick={() => setStatus('Sad')}
                        aria-label="Sad"
                        >
                        <FaRegFrown className="text-xl" /> Sad
                    </button>
                    <button
                        type="button"
                        className={`btn w-full ${status === 'SomewhatSad' ? 'btn-active btn-warning' : ''}`}
                        onClick={() => setStatus('SomewhatSad')}
                        aria-label="SomewhatSad"
                        >
                        <FaFrown className="text-xl" /> Somewhat Sad
                    </button>
                    <button
                        type="button"
                        className={`btn w-full ${status === 'Neutral' ? 'btn-active btn-neutral' : ''}`}
                        onClick={() => setStatus('Neutral')}
                        aria-label="Neutral"
                        >
                        <FaRegMeh className="text-xl" /> Neutral
                    </button>
                    <button
                        type="button"
                        className={`btn w-full ${status === 'SomewhatHappy' ? 'btn-active btn-info' : ''}`}
                        onClick={() => setStatus('SomewhatHappy')}
                        aria-label="SomewhatHappy"
                        >
                        <FaSmile className="text-xl" /> Somewhat Happy
                    </button>
                    <button
                        type="button"
                        className={`btn w-full ${status === 'Happy' ? 'btn-active btn-success' : ''}`}
                        onClick={() => setStatus('Happy')}
                        aria-label="Happy"
                        >
                        <FaRegSmile className="text-xl" /> Happy
                    </button>
                </div>
            </div>
            <div className="mb-4">
            <label className="block mb-2 font-semibold" htmlFor="note">
                Notes
            </label>
            <textarea
                id="note"
                onChange={e => setMessage(e.target.value)}
                value={message}
                className="textarea w-full"
                placeholder="Enter your check-in notes..."
                rows={4}
            />
            </div>
            <button
            type="submit"
            className="btn btn-primary w-full"
            >
            Submit Check-in 
            </button>   
    </form>
  )
}