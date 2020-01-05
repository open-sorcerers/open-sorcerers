import React, { useEffect, useState } from 'react'
import Auth from '@services/auth'

const useComponentDidMount = fn => {
  const [mounted, setState] = useState(false)
  useEffect(() => {
    if (!mounted) {
      setState(true)
      fn()
    }
  })
}

const Authenticate = () => {
  useComponentDidMount(() => {
    const auth = Auth()
    auth.handleAuthentication()
  })

  return (
    <>
      <h1>You should be redirected immediately.</h1>
    </>
  )
}

export default Authenticate
