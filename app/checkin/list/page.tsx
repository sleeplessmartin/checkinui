import React from 'react'
import RequireLogin from '../../components/RequireLogin'
import CheckinList from './CheckinList'

export default function CheckinListPage() {
  return (
    <RequireLogin>
      <div className="flex flex-col items-center justify-center min-h-screen bg-base-100">
        <h1 className="text-3xl font-bold mb-6">Check-ins</h1>
        <p className="text-gray-600">You can filter by user or by date created.</p>
        <CheckinList />
      </div>
    </RequireLogin>
  )
}