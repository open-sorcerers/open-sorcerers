import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Box } from 'rebass'

import { UNSET } from './constants'
import { checkIsValid } from './logic'

import Answer from './Answer'

export const Question = props => {
  const {
    answerType,
    answers,
    bad,
    good,
    correct,
    explanation,
    points,
    question,
    index,
    answerQuestion,
    resettable = false,
    showAnswers = true
  } = props

  const isSingle = answerType === 'single'
  const [userResponse, setUserResponse] = useState(UNSET)
  const [didAnswer, setAnswered] = useState(false)
  const [message, setMessage] = useState(UNSET)
  const isValid = checkIsValid({ isSingle, userResponse, correct })
  const submit = (
    <Button
      onClick={e => {
        e.preventDefault()
        if (!isSingle && userResponse.length < correct.length) {
          setMessage('Expected more choices.')
          return
        }
        answerQuestion({ question, userResponse, isValid, points })
        setAnswered(true)
      }}
    >
      Submit Answer
    </Button>
  )
  return (
    <Box as="section">
      <Box as="header">
        <strong>Question {index}</strong>
        <div>{question}</div>
      </Box>
      <Box>
        {message !== UNSET && <span>{message}</span>}
        <ul>
          {answers.map((aa, idx) => (
            <li key={aa}>
              <Answer
                {...{
                  setMessage,
                  correct,
                  didAnswer,
                  isSingle,
                  resettable,
                  setUserResponse,
                  setAnswered,
                  showAnswers,
                  userResponse
                }}
                index={idx}
              >
                {aa}
              </Answer>
            </li>
          ))}
        </ul>
      </Box>
      <Box as="footer">
        {!didAnswer ? '' : isValid ? good : bad}
        <br />
        {didAnswer ? explanation : submit}
      </Box>
    </Box>
  )
}

Question.propTypes = {
  answerType: PropTypes.string,
  answers: PropTypes.arrayOf(PropTypes.object),
  bad: PropTypes.string,
  good: PropTypes.string,
  correct: PropTypes.oneOf([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
  explanation: PropTypes.string,
  points: PropTypes.number,
  question: PropTypes.string,
  type: PropTypes.string,
  index: PropTypes.number,
  answerQuestion: PropTypes.func,
  resettable: PropTypes.bool,
  showAnswers: PropTypes.bool
}
export default Question
