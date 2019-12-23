import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { pipe, propOr } from 'ramda'

export const SubmitExample = props => {
  const [frames, setFrames] = pipe(propOr([], 'frames'), useState)(props)
  const [currentFrame, setCurrentFrame] = useState('')
  return (
    <div>
      <h1>Submit an example</h1>
      <label id="gist">Gist</label>
      <input type="text" htmlFor="#gist" />
      <em>or</em>
      <textarea value={currentFrame} onChange={e => setCurrentFrame(e.target.value)} />
    </div>
  )
}

SubmitExample.propTypes = {
  frames: PropTypes.array
}

export default SubmitExample
