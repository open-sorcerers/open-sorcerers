import React from 'react'
import { withTheme } from 'emotion-theming'
import Auth from '@services/auth'
import { pipe, replace } from 'ramda'
import { LOGOUT } from '@constants/routes'
import { ProfileImg } from './ProfileImg'
import { ProfilePage, StyledLogoutButton } from './styled'

const LogoutButton = withTheme(() => <StyledLogoutButton to={LOGOUT}>Log Out</StyledLogoutButton>)

const formatUsername = pipe(
  z => z.toLowerCase(),
  replace(/ /g, '-'),
  z => '@' + z
)

export const Profile = withTheme(() => {
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
})
export default Profile
