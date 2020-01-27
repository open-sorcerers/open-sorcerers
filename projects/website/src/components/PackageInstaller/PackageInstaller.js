import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { cond, T, always as K, prop } from 'ramda'

import { PackageName, StyledPackageManager, PreferYarn, Pre, Code, Pullquote } from './styled'

const flag = cond([
  [prop('peer'), K('-P')],
  [prop('dev'), K('-D')],
  [prop('global'), K('')],
  [T, K('')]
])

export const PackageInstaller = props => {
  const { pkg, global: gl, children } = props
  const [useYarn, setPkgManager] = useState(true)
  return (
    <StyledPackageManager>
      {children ? <Pullquote>{children}</Pullquote> : null}

      <Pre>
        <Code>
          {useYarn ? (gl ? 'yarn global add ' : 'yarn add') : 'npm install'}{' '}
          <PackageName>{pkg}</PackageName> {flag(props)}
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
  dev: PropTypes.bool,
  global: PropTypes.bool
}

export default PackageInstaller
