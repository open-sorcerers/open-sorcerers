import auth0 from 'auth0-js'
import { navigate } from 'gatsby'
import { once } from 'ramda'

const user = 'gatsbyUser'

export const windowExists = () => typeof window !== 'undefined'
/* export const getUser = () => */
/*   windowExists() && window.localStorage.getItem(user) ? JSON.parse(window.localStorage.getItem(user)) : {}; */
/* const setUser = raw => window.localStorage.setItem(user, JSON.stringify(raw)); */

/* const users = { */
/*   brekk: { */
/*     username: 'brekk', */
/*     name: 'Brekk Bockrath', */
/*     email: 'brekk@brekkbockrath.com', */
/*   }, */
/* }; */
/* export const handleLogin = ({ username, password }) => { */
/*   if (!windowExists()) return false; */
/*   if (username === `brekk` && password === `cool`) { */
/*     setUser(users.brekk); */
/*     return true; */
/*   } */
/*   return false; */
/* }; */
/* export const isLoggedIn = () => { */
/*   const user = getUser(); */
/*   return !!user.username; */
/* }; */
/* export const logout = callback => { */
/*   setUser({}); */
/*   callback(); */
/* }; */

// src/utils/auth.js

const AUTH0_DOMAIN = 'open-sorcerers.eu.auth0.com'
const AUTH0_CLIENT_ID = 'zkUBHhxYTV8IwnASqWDkQOiDx31CNuDI'

export const Auth = once(() => {
  const zero = new auth0.WebAuth({
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENT_ID,
    redirectUri: 'http://localhost:8000/authenticate',
    audience: `https://${AUTH0_DOMAIN}/api/v2/`,
    responseType: 'token id_token',
    scope: 'openid profile email'
  })

  const login = () => {
    zero.authorize()
  }

  const logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    localStorage.removeItem('user')
  }

  const handleAuthentication = () => {
    if (typeof window !== 'undefined') {
      // this must've been the trick
      zero.parseHash((err, authResult) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          setSession(authResult)
        } else if (err) {
          console.log(err)
        }

        // Return to the homepage after authentication.
        navigate('/')
      })
    }
  }

  const isAuthenticated = () => {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }

  const setSession = authResult => {
    const expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime())
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)

    zero.client.userInfo(authResult.accessToken, (err, user) => {
      localStorage.setItem('user', JSON.stringify(user))
    })
  }

  const getUser = () => {
    if (localStorage.getItem('user')) {
      return JSON.parse(localStorage.getItem('user'))
    }
  }

  const getUserName = () => {
    if (getUser()) {
      return getUser().name
    }
  }
  return {
    login,
    logout,
    handleAuthentication,
    isAuthenticated,
    setSession,
    getUser,
    getUserName
  }
})

export default Auth
