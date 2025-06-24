import React from 'react'
import RequireLogin from '../../components/RequireLogin'

const page = () => {
  return (
    <RequireLogin>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-bold mb-4">Check-in Page</h1>
        <p className="text-lg">This is the check-in page.</p>
      </div>
    </RequireLogin>
  )
}

export default page       