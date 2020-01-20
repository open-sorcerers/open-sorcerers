import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'rebass'

import { reject, equals } from 'ramda'

import { prefix } from './logic'
import { UNSET } from './constants'

export const Answer = ({
  setMessage,
  correct,
  didAnswer,
  index: idx,
  isSingle,
  resettable,
  setUserResponse,
  showAnswers,
  userResponse,
  children
}) => {
  const [active, setActive] = useState(false)
  return (
    <Button
      onClick={e => {
        e.preventDefault()
        if (!resettable && didAnswer) return
        setMessage(UNSET)
        const multi = userResponse === UNSET ? [] : userResponse
        if (!active) {
          const ur = isSingle ? idx : multi.concat(idx)
          if (isSingle) {
            setUserResponse(ur)
          } else {
            while (ur.length > correct.length) ur.shift()
            setUserResponse(ur)
          }
        } else {
          const ur = isSingle ? UNSET : reject(equals(idx), multi)
          setUserResponse(ur)
          setActive(!active)
        }
      }}
    >
      {prefix({
        didAnswer,
        correct,
        idx,
        isSingle,
        showAnswers,
        userResponse
      })}{' '}
      {children}
    </Button>
  )
}

Answer.propTypes = {
  setMessage: PropTypes.func,
  correct: PropTypes.any,
  didAnswer: PropTypes.bool,
  index: PropTypes.number,
  isSingle: PropTypes.bool,
  resettable: PropTypes.bool,
  setUserResponse: PropTypes.func,
  showAnswers: PropTypes.bool,
  userResponse: PropTypes.any,
  children: PropTypes.node
}

export default Answer
