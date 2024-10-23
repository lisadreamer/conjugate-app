import { useSession, signIn } from 'next-auth/react'
import React, { useEffect } from 'react'

const ProtectedPage: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === 'loading') return // Do nothing while loading
    if (!session) signIn() // Redirect them to sign in
  }, [session, status])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  return children
}

export default ProtectedPage
