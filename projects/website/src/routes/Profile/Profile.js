import React from 'react'
import Auth from '@services/auth'
import { Link } from 'gatsby'
import { pipe, replace } from 'ramda'
import { LOGOUT } from '@constants/routes'
import { ProfileImg } from './ProfileImg'
import { ProfilePage, logoutButton } from './styled'

const LogoutButton = () => (
  <Link to={LOGOUT} css={logoutButton}>
    Log Out
  </Link>
)

const formatUsername = pipe(
  z => z.toLowerCase(),
  replace(/ /g, '-'),
  z => '@' + z
)

export const Profile = () => {
  const { getUser } = Auth()
  const user = getUser()
  const { name } = user
  return (
    <>
      <ProfilePage>
        <h1>Profile</h1>
        <LogoutButton />
        <ProfileImg />
        <em>{formatUsername(name)}</em>
      </ProfilePage>
    </>
  )
}
export default Profile
