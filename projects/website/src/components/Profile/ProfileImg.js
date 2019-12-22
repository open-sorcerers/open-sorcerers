import React from 'react'
import Auth from '@services/auth'
import { validDomain } from '@utils/url'
import { placeholder, Img } from './styled'

const Fallback = () => <div css={placeholder} />

export const ProfileImg = () => {
  const { getUser } = Auth()
  const user = getUser()
  const { picture } = user
  const isValidImage = validDomain(picture)
  return isValidImage ? (
    <Img>
      <img src={picture} />
    </Img>
  ) : (
    <Fallback />
  )
}

export default ProfileImg
