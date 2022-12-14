import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import { apiNextURl } from '../api'
import { deleteCookie } from '../utils'

export default function Session() {
  const router = useRouter();
  const [state, setState] = useState<any>({
    isFetching: false,
    message: null,
    user: null,
  })

  const { isFetching, message, user = {} } = state

  const getUserInfo = async () => {
    setState({ ...state, isFetching: true, message: 'fetching details...' })
    try {
      const res = await fetch(`${apiNextURl}/session`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          Authorization: (window as any).token,
        },
      }).then(res => res.json())

      const { success, user } = res
      if (!success) {
        router.push('/login')
      }
      setState({ ...state, user, message: null, isFetching: false })
    } catch (e: any) {
      setState({ ...state, message: e.toString(), isFetching: false })
    }
  }

  const handleLogout = () => {
    deleteCookie('token')
    router.push('/login')
  }

  useEffect(() => {
    getUserInfo()
  }, [])

  return (
    <div className="wrapper">
      <h1>Welcome, {user && user.name}</h1>
      {user && user.email}
      <div className="message">
        {isFetching ? 'fetching details..' : message}
      </div>

      <button
        style={{ height: '30px' }}
        onClick={() => {
         handleLogout()
        }}
      >
        logout
      </button>
    </div>
  )
}
