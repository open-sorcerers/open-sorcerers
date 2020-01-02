import { css } from '@emotion/core'

export const hexagon = ({ size, color }) => {
  const tr = css`
    transition: background 0.3s ease-out, border 0.3s ease-out, top 0.3s ease-out,
      left 0.3s ease-out;
  `
  const pseudo = css`
    ${tr}
    border-left: ${size / 2}px solid transparent;
    border-right: ${size / 2}px solid transparent;
    content: '';
    height: 0;
    left: 0;
    position: absolute;
    width: 0;
  `
  const psHeight = size * (28 / 100)
  const hex = css`
  ${tr}
  position: relative;
  background-color: ${color};
  width: ${size}px;
  height: ${size * 0.55}px;
  &::before {
    ${pseudo}
    top: -${psHeight}px;
    border-bottom: ${psHeight}px solid ${color};
  }
  &::after {
    ${pseudo}
    bottom: -${psHeight}px;
    border-top: ${psHeight}px solid ${color};
  }
`
  return hex
}

export const strikethrough = ({
  pseudo = 'after',
  scale = '110%',
  height = '20px',
  rotation = 'rotate(-5deg)',
  translate = 'translate(-4.5%, -3.6rem)',
  background = 'black'
}) => `
  ::${pseudo} {
    content: '';
    width: ${scale};
    display: inline-block;
    position: relative;
    background: ${background};
    height: ${height};
    transform: ${rotation} ${translate};
    cursor: not-allowed;
  }
`
