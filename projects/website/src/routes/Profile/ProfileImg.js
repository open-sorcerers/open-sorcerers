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

export const ProfileImg = ({ El = Img, variant, children }) => {
  const { getUser } = Auth()
  const user = getUser()
  if (!user) return null
  const { picture } = user
  const isValidImage = validDomain(picture)
  /* const isValidImage = false */
  return isValidImage ? (
    <El variant={variant}>
      <img src={picture} />
      {children}
    </El>
  ) : variant === 'menu' ? (
    <MenuFallback>
      <span role="img" aria-label="No profile image set.">
        🖤
      </span>
      {children}
    </MenuFallback>
  ) : (
    <Fallback />
  )
}

ProfileImg.propTypes = {
  variant: PropTypes.string,
  El: PropTypes.object,
  children: PropTypes.node
}

export default ProfileImg
