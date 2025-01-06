'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

interface Props {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)
  const router = useRouter()

  // check authentication state in local storage
  React.useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuthenticated(true)
    }
  }, [])
  // if not authenticated, redirect to login page
  if (!isAuthenticated) {
    router.push('/login')
  }

  return <>{isAuthenticated ? children : ''}</>
}

export default ProtectedRoute
