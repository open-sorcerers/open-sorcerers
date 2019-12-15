const user = 'gatsbyUser'

export const windowExists = () => typeof window !== "undefined"
export const getUser = () =>
  windowExists() && window.localStorage.getItem(user)
    ? JSON.parse(window.localStorage.getItem(user))
    : {}
const setUser = user =>
  window.localStorage.setItem(user, JSON.stringify(user))
export const handleLogin = ({ username, password }) => {
  if (username === `john` && password === `pass`) {
    return setUser({
      username: `john`,
      name: `Johnny`,
      email: `johnny@example.org`,
    })
  }
  return false
}
export const isLoggedIn = () => {
  const user = getUser()
  return !!user.username
}
export const logout = callback => {
  setUser({})
  callback()
}
