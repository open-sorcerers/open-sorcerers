import { navigate } from 'gatsby'
import Auth from '@services/auth'

const { logout } = Auth()

export const Logout = () => {
  logout(() => navigate('/app/login'))
  return null
}

export default Logout
