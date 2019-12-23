import { navigate } from 'gatsby'
import Auth from '@services/auth'
import { LOGOUT } from '@constants/routes'

const { logout } = Auth()

export const Logout = () => {
  logout(() => navigate(LOGOUT))
  return null
}

export default Logout
