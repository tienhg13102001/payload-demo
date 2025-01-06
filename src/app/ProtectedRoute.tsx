'use client'
import React from 'react'

interface Props {
  children: React.ReactNode
}

const ProtectedRoute = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)

  // check authentication state in local storage
  React.useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsAuthenticated(true)
    }
  }, [])
  // if not authenticated, redirect to login page
  if (!isAuthenticated) {
    window.location.href = '/login'
  }

  return <>{isAuthenticated ? children : ''}</>
}

export default ProtectedRoute
