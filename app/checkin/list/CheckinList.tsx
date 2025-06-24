'use client'
import React, { useEffect, useState } from 'react'

type Checkin = {
  id: string
  user_id: string
  status: string
  message: string
  created_at: string
}

export default function CheckinList() {
  const [checkins, setCheckins] = useState<Checkin[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCheckins = async () => {
      try {
        const res = await fetch('http://localhost:5210/api/checkin/search/?filter=')
        if (!res.ok) throw new Error('Failed to fetch check-ins')
        const data = await res.json()
        setCheckins(data)
      } catch (err: any) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchCheckins()
  }, [])

  if (loading) return <div className="text-center">Loading...</div>
  if (error) return <div className="text-red-500 text-center">{error}</div>

  return (
    <div className="overflow-x-auto w-full">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Status</th>
            <th>Message</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {checkins.map((checkin) => (
            <tr key={checkin.id}>
              <td>{checkin.user_id}</td>
              <td>{checkin.status}</td>
              <td>{checkin.message}</td>
              <td>{new Date(checkin.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )