import styled from '@emotion/styled'
import { Box } from 'rebass'

import * as ℂ from '@styles/colors'

export const StyledPackageManager = styled(Box)`
  margin-bottom: 1rem;
`
export const PackageManagerHeader = styled.h1`
  margin: 0.5rem 0;
`
export const PreferYarn = styled(Box)`
  text-align: right;
  margin-bottom: 0.5rem;
`
export const Pre = styled.pre`
  display: block;
`
export const Code = styled.code`
  margin: 0.5rem 0.5rem;
`
export const Pullquote = styled.blockquote`
  margin: 1rem;
`

// TODO: fix this text-shadow color ref
export const PackageName = styled.strong`
  color: ${ℂ.area.pkg.f};
  font-weight: 800;
  text-shadow: 0 0 1rem rgba(255, 255, 0, 0.3);
`
