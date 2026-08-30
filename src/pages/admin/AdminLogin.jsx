import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Button from '../../components/common/Button'
import Loading from '../../components/common/Loading'

const AdminLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/admin/dashboard')
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream p-4">
      <div className="bg-white p-8 rounded-2xl shadow-card max-w-md w-full">
        <h2 className="heading-section text-2xl text-center">Welcome Mary</h2>
        <p className="text-center text-neutral-500 mt-2">Access your admin dashboard</p>
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
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? <Loading text="Logging in..." /> : 'Login'}
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-neutral-500">
          Don't have an account? <Link to="/admin/signup" className="text-primary hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  )
}

export default AdminLogin