import React from 'react'
import ProtectedRoute from '../ProtectedRoute'

interface Props {}

const Home = (props: Props) => {
  const isAuthenticated = false
  return (
    <ProtectedRoute>
      <h1 className="text-3xl bg-red-500 font-bold underline">Home page</h1>
    </ProtectedRoute>
  )
}

export default Home
