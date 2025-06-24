'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useLogin } from '../../LoginContext'
import RequireLogin from '../../components/RequireLogin'
import { FaRegMeh, FaRegSmile, FaRegFrown, FaSmile, FaFrown, FaMeh } from 'react-icons/fa'

const CreateCheckinPage = () => {
    const { loginData } = useLogin()
    const [message, setMessage] = useState<string>('')
    const [status, setStatus] = useState<string>('Neutral') // Mood state

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        console.log(JSON.stringify(loginData, null, 2))
        try {
            const res = await fetch('http://localhost:5210/api/checkin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    user_id: loginData.user_id, 
                    status: status, 
                    message, 
                    created_by_id: loginData.user_id }),
                })
            
            if (res.ok) {
                const test = JSON.stringify(await res.json(), null, 2)
                alert(test)
                console.log(test)
            }
        } catch (err: any) {
            console.log(err.message)
        } finally {
            setMessage('') // Clear the message after submission
        }
    }

  return (
    <RequireLogin>
        <div className="flex flex-col items-center justify-center min-h-screen bg-base-100">
        <h1 className="text-3xl font-bold mb-6">Create a Check-in</h1>
        <p className="mb-4 text-gray-600">
            Hi, <strong>{loginData.full_name}</strong>! Fill out the form below to create a new check-in.
        </p>
        {/* Form will go here */}
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
        </div>
    </RequireLogin>
  )
}

export default CreateCheckinPage