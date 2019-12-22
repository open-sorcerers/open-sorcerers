import auth0 from 'auth0-js'
import { navigate } from 'gatsby'
import { once } from 'ramda'

const CONSTANTS = Object.freeze({
  ACCESS_TOKEN: 'access_token',
  ID_TOKEN: 'id_token',
  EXPIRES_AT: 'expires_at',
  USER: 'user'
})
const { ACCESS_TOKEN, ID_TOKEN, EXPIRES_AT, USER } = CONSTANTS

export const windowExists = () => typeof window !== 'undefined'

const AUTH0_DOMAIN = 'open-sorcerers.eu.auth0.com'
const AUTH0_CLIENT_ID = 'zkUBHhxYTV8IwnASqWDkQOiDx31CNuDI'

/* use this to spoof the user profile when working offline
const spoof = () => {
  const CONSTANTS = Object.freeze({
    ACCESS_TOKEN: 'access_token',
    ID_TOKEN: 'id_token',
    EXPIRES_AT: 'expires_at',
    USER: 'user'
  })
  const { ACCESS_TOKEN, ID_TOKEN, EXPIRES_AT, USER } = CONSTANTS
  const now = new Date()
  localStorage.setItem(ACCESS_TOKEN, 'cool')
  localStorage.setItem(ID_TOKEN, 'so-cool')
  localStorage.setItem(EXPIRES_AT, now.valueOf() + 1e10)
  localStorage.setItem(USER, JSON.stringify({
    sub: 'subsub',
    given_name: 'Open',
    family_name: 'Sorcerers',
    nickname: 'fpopensorcerers',
    name: 'Open Sorcerers',
    picture: 'invalid picture. deal with it!',
    locale: 'en',
    updated_at: now.toISOString(),
    email: 'cool@sorcerers.dev',
    email_verified: true
  }))
}
*/

export const Auth = once(() => {
  const DOMAIN =
    process.env.NODE_ENV === 'production'
      ? 'https://open-sorcerers.brekk.now.sh'
      : 'http://localhost:8000'
  const zero = new auth0.WebAuth({
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENT_ID,
    redirectUri: `${DOMAIN}/authenticate`,
    audience: `https://${AUTH0_DOMAIN}/api/v2/`,
    responseType: `token ${ID_TOKEN}`,
    scope: 'openid profile email'
  })

  const login = () => {
    zero.authorize()
  }

  const logout = cb => {
    if (!windowExists()) return
    localStorage.removeItem(ACCESS_TOKEN)
    localStorage.removeItem(ID_TOKEN)
    localStorage.removeItem(EXPIRES_AT)
    localStorage.removeItem(USER)
    if (typeof cb === 'function') return cb()
  }

  const handleAuthentication = () => {
    if (windowExists()) {
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
    const expiresAt = JSON.parse(localStorage.getItem(EXPIRES_AT))
    return new Date().getTime() < expiresAt
  }

  const setSession = authResult => {
    const expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime())
    localStorage.setItem(ACCESS_TOKEN, authResult.accessToken)
    localStorage.setItem(ID_TOKEN, authResult.idToken)
    localStorage.setItem(EXPIRES_AT, expiresAt)

    zero.client.userInfo(authResult.accessToken, (err, user) => {
      localStorage.setItem(USER, JSON.stringify(user))
    })
  }

  const getUser = () => {
    if (localStorage.getItem(USER)) {
      return JSON.parse(localStorage.getItem(USER))
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
