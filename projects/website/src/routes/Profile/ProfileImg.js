import React from 'react'
import PropTypes from 'prop-types'
import Auth from '@services/auth'
import { validDomain } from '@utils/url'
import { Box } from 'rebass'
import styled from '@emotion/styled'
import { placeholder, Img, menuPlaceholder } from './styled'

const Fallback = styled(Box)`
  ${placeholder}
`
const MenuFallback = styled(Box)`
  ${menuPlaceholder}
`

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
    <MenuFallback>
      <span role="img" aria-label="No profile image set.">
        🖤
      </span>
    </MenuFallback>
  ) : (
    <Fallback />
  )
}

ProfileImg.propTypes = {
  variant: PropTypes.string
}

export default ProfileImg
