/* eslint-disable-next-line no-unused-vars */
import React from "react"
import styled from "@emotion/styled"
import { map, toPairs, pipe, propOr, replace } from "ramda"

const size = propOr(0, 'size')
const limeDefault = propOr('lime', 'color')
const content = pipe(propOr(false, "label"), replace(/_/g, " "))

export const Breakpoint = styled.div`
  position: fixed;
  height: 100vh;
  width: 1rem;
  z-index: 100;
  top: 0;
  left: ${size};
  border-left: 1px dashed lime;
  opacity: 0.1;
  cursor: crosshair;
  &:hover {
    opacity: 1;
  }
  &::before {
    position: absolute;
    background-color: ${limeDefault};
    color: black; 
    content: "${content}";
    transform: rotate(-90deg);
    padding: 0 3rem 0 1rem;
    width: 10rem;
    margin-left: -6.25rem;
    margin-top: 2rem;
  }
`

export const HorizontalBreakpoint = styled.div`
  position: fixed;
  width: 100vw;
  height: 1rem;
  z-index: 100;
  left: 0;
  top: ${size};
  border-bottom: 1px dashed lime;
  opacity: 0.1;
  cursor: crosshair;
  &:hover {
    opacity: 1;
  }
  &::before {
    position: absolute;
    background-color: ${limeDefault};
    color: black; 
    content: "${content}";
    padding: 0 3rem 0 1rem;
    width: 10rem;
    left: 0;
    margin-top: -0.5rem;
  }
`

export const renderBreakpoints = pipe(
  toPairs,
  map(([key, px]) => ({ size: px, label: key })),
  kids => () => (
    <>
      {map(
        bb => (
          <Breakpoint key={bb.label} {...bb} />
        ),
        kids
      )}
    </>
  )
)
