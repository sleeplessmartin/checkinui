'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useLogin } from '@/app/LoginContext'
import RequireLogin from '../../components/RequireLogin'

type Checkin = {
  checkin_id: string
  user_id: string
  status: string
  message: string
  created_timestamp: string
  updated_by_id: string
}

const CheckinDetailPage = () => {
  const { checkin_id } = useParams()
  const { loginData } = useLogin()
  const [checkin, setCheckin] = useState<Checkin | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editMode, setEditMode] = useState(false)
  const [form, setForm] = useState({ status: '', message: '', updated_by_id: '' })
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!checkin_id) return
    fetch(`http://localhost:5210/api/checkin/${checkin_id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch check-in')
        return res.json()
      })
      .then(data => {
        setCheckin(data)
        setForm({ status: data.status, message: data.message, updated_by_id: data.updated_by_id })
        setLoading(false)
      })
      .catch(err => {
        setError(err.message)
        setLoading(false)
      })
  }, [checkin_id])

  const handleEdit = () => setEditMode(true)
  const handleCancel = () => setEditMode(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value, updated_by_id: loginData?.user_id ?? 'system_user' }) // Replace with actual user ID
  }

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch(`http://localhost:5210/api/checkin/${checkin_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed to update check-in')
      const updated = await res.json()
      setCheckin(updated)
      setEditMode(false)
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <RequireLogin>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Check-in Details</h1>
        {loading && <div>Loading...</div>}
        {error && <div className="text-red-500">{error}</div>}
        {checkin && !editMode && (
          <div className="bg-base-200 p-6 rounded shadow w-full max-w-md">
            <div><strong>ID:</strong> {checkin.checkin_id}</div>
            <div><strong>User ID:</strong> {checkin.user_id}</div>
            <div><strong>Status:</strong> {checkin.status}</div>
            <div><strong>Message:</strong> {checkin.message}</div>
            <div><strong>Created Date:</strong> {checkin.created_timestamp}</div>
            <div><strong>Updated By:</strong> {checkin.updated_by_id}</div>
            <button className="btn btn-primary mt-4" onClick={handleEdit}>Edit</button>
          </div>
        )}
        {checkin && editMode && (
          <form onSubmit={handleUpdate} className="bg-base-200 p-6 rounded shadow w-full max-w-md">
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Status</label>
              <input
                name="status"
                value={form.status}
                onChange={handleChange}
                className="input input-bordered w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-semibold">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                className="textarea w-full"
                required
              />
            </div>
            <div className="flex gap-2">
              <button type="submit" className="btn btn-success" disabled={saving}>
                {saving ? 'Saving...' : 'Save'}
              </button>
              <button type="button" className="btn btn-ghost" onClick={handleCancel} disabled={saving}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </RequireLogin>
  )
}

export default CheckinDetailPage