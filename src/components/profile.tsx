'use client'

import { useSession, signIn, signOut } from 'next-auth/react'

export default function Profile() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return null
  }

  return (
    <div className="flex gap-4 items-center">
      {session?.user ? (
        <>
          <div className="flex gap-2 items-center">
            <img
              src={session.user.image || ''}
              className="w-8 h-8 rounded-full"
              alt="profie avatar"
            />
            <p>{session.user.name}</p>
          </div>
          <button
            className="rounded border border-gray-500 px-4 py-2"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </>
      ) : (
        <>
          <button
            className="rounded border border-gray-500 px-4 py-2"
            onClick={() => signIn()}
          >
            Sign in
          </button>
          <button
            className="rounded border border-gray-500 px-4 py-2"
            onClick={() => signIn()}
          >
            Sign up
          </button>
        </>
      )}
    </div>
  )
}
