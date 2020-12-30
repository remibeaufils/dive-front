import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
const AuthContext = createContext()

function AuthProvider({ children }) {
  console.log('AuthProvider');
  const { pathname, events } = useRouter()
  const [user, setUser] = useState()

  async function getUser() {
    try {
      // const response = await fetch('/api/me')
      // const profile = await response.json()
      const profile = { email: 'hey', name: 'holaa'}
      if (profile.error) {
        setUser(null)
      } else {
        setUser(profile)
      }
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    console.log('useEffect pathname');
    getUser()
  }, [pathname])

  useEffect(() => {
    console.log('useEffect user');
    // Check that a new route is OK
    const handleRouteChange = url => {
      if (url !== '/' && !user) {
        window.location.href = '/'
      }
    }

    console.log('HOLA', user);

    // Check that initial route is OK
    if (pathname !== '/' && user === null) {
      window.location.href = '/'
    }

    // Monitor routes
    events.on('routeChangeStart', handleRouteChange)
    return () => {
      events.off('routeChangeStart', handleRouteChange)
    }
  }, [user])

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export { AuthProvider, useAuth }