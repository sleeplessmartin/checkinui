import React, { useEffect } from 'react'
import Link from 'next/link'
import RequireLogin from '../components/RequireLogin'
import { useRouter } from 'next/navigation'

const DashboardPage = () => {
  return (
     <RequireLogin>
      <div className="flex justify-center items-center">
        <div className="m-4">
          <ul className="menu bg-base-200 rounded-box w-56">
            <li>
              <Link
                href="/checkin/create"
                className="text-blue-600 hover:underline hover:text-blue-800 transition-colors"
              >
                Create a check-in
              </Link>
            </li>
            <li>
              <Link
                href="/checkin/list"
                className="text-blue-600 hover:underline hover:text-blue-800 transition-colors"
              >
                Your check-ins
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </RequireLogin>
  )
}

export default DashboardPage