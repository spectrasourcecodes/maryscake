// src/components/common/PrivateRoute.jsx
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import Loading from './Loading'

const PrivateRoute = () => {
  const { user, loading } = useAuth()
  if (loading) return <Loading fullScreen text="Checking auth..." />
  return user ? <Outlet /> : <Navigate to="/admin/login" replace />
}

export default PrivateRoute