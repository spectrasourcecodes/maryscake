import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Button from '../../components/common/Button'
import Loading from '../../components/common/Loading'

const AdminSignup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [secretKey, setSecretKey] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)
    try {
      await signup(email, password, secretKey)
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream p-4">
      <div className="bg-white p-8 rounded-2xl shadow-card max-w-md w-full">
        <h2 className="heading-section text-2xl text-center">Admin Signup</h2>
        <p className="text-center text-neutral-500 mt-2">Create an admin account</p>
        {error && <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:outline-none"
              required
              minLength={6}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700">Secret Key</label>
            <input
              type="password"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/50 focus:outline-none"
              required
              placeholder="Admin secret key"
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loading text="Creating account..." /> : 'Sign Up'}
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-neutral-500">
          Already have an account? <Link to="/admin/login" className="text-primary hover:underline">Login</Link>
        </p>
      </div>
    </div>
  )
}

export default AdminSignup