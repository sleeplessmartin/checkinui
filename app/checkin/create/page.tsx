import RequireLogin from '../../components/RequireLogin'
import CheckinForm from './CheckinForm'

export default function CreateCheckinPage() {
  return (
    <RequireLogin>
      <div className="flex flex-col items-center justify-center min-h-screen bg-base-100">
        <h1 className="text-3xl font-bold mb-6">Create a Check-in</h1>
        <CheckinForm />
      </div>
    </RequireLogin>
  )
}