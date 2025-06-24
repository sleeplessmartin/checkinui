import React from 'react'
import RequireLogin from '../components/RequireLogin'

const DashboardPage = () => {
  return (
    <RequireLogin>
      <div className="m-4">Dashboard Page</div>
    </RequireLogin>
  )
}

export default DashboardPage