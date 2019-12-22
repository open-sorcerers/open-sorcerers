import React from 'react'
import Auth from '@services/auth'
import { Link } from 'gatsby'
import { pipe, replace } from 'ramda'
import { validDomain } from '@utils/url'
import { ProfilePage, Img, logoutButton, placeholder } from './styled'

const LogoutButton = () => (
  <Link to="/app/logout" css={logoutButton}>
    Log Out
  </Link>
)

const Fallback = () => <div css={placeholder} />

const ProfileImg = ({ src }) => {
  const isValidImage = validDomain(src)
  console.log('isValidImage', isValidImage)
  return isValidImage ? (
    <Img>
      <img src={src} />
    </Img>
  ) : (
    <Fallback />
  )
}

const auth = Auth()

const formatUsername = pipe(
  z => z.toLowerCase(),
  replace(/ /g, '-'),
  z => '@' + z
)

export const Profile = ({}) => {
  const { getUser } = auth
  const user = getUser()
  const { name, picture } = user
  return (
    <>
      <ProfilePage>
        <h1>Profile</h1>
        <LogoutButton />
        <ProfileImg src={picture} />
        <em>{formatUsername(name)}</em>
      </ProfilePage>
    </>
  )
}
export default Profile
