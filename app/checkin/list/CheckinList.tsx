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
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('Fetching check-ins with filter:', filter)
    const url = filter
        ? `http://localhost:5210/api/checkin/search/${encodeURIComponent(filter)}`
        : `http://localhost:5210/api/checkin/search`

    console.log('Fetch URL:', url)

    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
        })
        .then(res => {
            if (!res.ok) throw new Error('Network response was not ok');
            return res.json();
        })
        .then(data => {
            // Handle the data (list of check-ins)
            setCheckins(data)
            setLoading(false)
        })
        .catch(error => {
            console.error('Fetch error:', error);
            setError(error.message)
            setLoading(false)
        });
  }, [filter])

  if (loading) return <div className="text-center">Loading...</div>
  if (error) return <div className="text-red-500 text-center">{error}</div>

  return (
    <div>
      <div className="flex justify-end mb-4">
        <input
          type="text"
          className="input input-bordered w-full max-w-xs"
          placeholder="Filter by user or date..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
      </div>
      <div className="overflow-x-auto w-full max-w-6xl mx-auto mt-8 shadow-lg rounded-lg bg-base-200">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="bg-base-300 text-base-content">
              <th className="px-6 py-3 text-left">Check-in ID</th>
              <th className="px-6 py-3 text-left">User ID</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Message</th>
              <th className="px-6 py-3 text-left">Created At</th>
            </tr>
          </thead>
          <tbody>
            {checkins.map((checkin) => (
              <tr key={checkin.checkin_id} className="hover:bg-base-100 transition-colors">
                <td className="px-6 py-2 font-mono text-xs text-gray-500 text-center">{checkin.checkin_id}</td>
                <td className="px-6 py-2">{checkin.user_id}</td>
                <td className="px-6 py-2">
                  <span className="badge badge-outline capitalize">{checkin.status}</span>
                </td>
                <td className="px-6 py-2 max-w-md truncate" title={checkin.message}>{checkin.message}</td>
                <td className="px-6 py-2 text-sm text-gray-500">{checkin.created_timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    )
}