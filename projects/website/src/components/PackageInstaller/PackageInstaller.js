import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { PackageName, StyledPackageManager, PreferYarn, Pre, Code, Pullquote } from './styled'

export const PackageInstaller = ({ pkg, peer, dev, children }) => {
  const [useYarn, setPkgManager] = useState(true)
  return (
    <StyledPackageManager>
      {children ? <Pullquote>{children}</Pullquote> : null}

      <Pre>
        <Code>
          {useYarn ? 'yarn add' : 'npm install'} <PackageName>{pkg}</PackageName>{' '}
          {peer || dev ? (peer ? '-P' : '-D') : ''}
        </Code>
      </Pre>

      <PreferYarn>
        <label>
          <input
            type="checkbox"
            name="pkg-manager"
            checked={!useYarn}
            onClick={() => {
              setPkgManager(!useYarn)
            }}
          />{' '}
          <strong>Prefer {useYarn ? 'npm' : 'yarn'}?</strong>
        </label>
      </PreferYarn>
    </StyledPackageManager>
  )
}

PackageInstaller.propTypes = {
  children: PropTypes.node,
  pkg: PropTypes.string,
  peer: PropTypes.bool,
  dev: PropTypes.bool
}

export default PackageInstaller
