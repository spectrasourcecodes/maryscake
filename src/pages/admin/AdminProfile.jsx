import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import api from '../../services/api'
import Button from '../../components/common/Button'
import Loading from '../../components/common/Loading'

const AdminProfile = () => {
  const { user } = useAuth()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match')
      return
    }

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters')
      return
    }

    setLoading(true)
    try {
      await api.put('/auth/profile', { currentPassword, newPassword })
      setSuccess('Password updated successfully!')
      setCurrentPassword('')
      setNewPassword('')
      setConfirmPassword('')
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <h1 className="heading-section text-2xl">Profile</h1>
      <p className="text-neutral-500 mt-1">Update your account password</p>

      <div className="mt-6 bg-white p-6 rounded-xl shadow-soft max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>}
          {success && <div className="p-3 bg-green-50 text-green-700 rounded-lg text-sm">{success}</div>}

          <div>
            <label className="block text-sm font-medium text-neutral-700">Username</label>
            <input
              type="text"
              value={user?.username || ''}
              disabled
              className="w-full px-4 py-2 border rounded-lg bg-neutral-50 text-neutral-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:outline-none"
              required
              minLength={6}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:outline-none"
              required
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? <Loading text="Updating..." /> : 'Update Password'}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default AdminProfile