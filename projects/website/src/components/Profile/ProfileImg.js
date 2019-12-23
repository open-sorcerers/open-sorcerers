import React from 'react'
import PropTypes from 'prop-types'
import Auth from '@services/auth'
import { validDomain } from '@utils/url'
import { placeholder, Img } from './styled'

const Fallback = () => <div css={placeholder} />

export const ProfileImg = ({ variant }) => {
  const { getUser } = Auth()
  const user = getUser()
  if (!user) return null
  const { picture } = user
  const isValidImage = validDomain(picture)
  /* const isValidImage = false */
  return isValidImage && variant !== 'DropMenu' ? (
    <Img>
      <img src={picture} />
    </Img>
  ) : variant === 'DropMenu' ? (
    <Img>?</Img>
  ) : (
    <Fallback />
  )
}

ProfileImg.propTypes = {
  variant: PropTypes.string
}

export default ProfileImg
