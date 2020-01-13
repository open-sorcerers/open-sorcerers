import React, { useState } from 'react'
import { reject, equals, pipe, map, curry } from 'ramda'
import { trace } from 'xtrace'
import PropTypes from 'prop-types'
import { Button, Box } from 'rebass'

/* import QuizCo from 'react-quiz-component' */
import { makeQuiz, makeQuestionsFromObject } from './utils'

export const UNSET = 'UNSET'

const GOOD = '👍🏽'
const BAD = '👎🏽'
const CHOICE = '✏️'

const checkIsValid = ({ isSingle, userResponse, correct }) => userResponse === correct

const prefix = ({ didAnswer, correct, idx, isSingle, showAnswers, userResponse }) => {
  if (isSingle) {
    if (idx === userResponse) {
      if (showAnswers && didAnswer) {
        return correct === userResponse ? GOOD : BAD
      }
      return CHOICE
    }
  } else {
    if (userResponse.includes(idx)) {
      if (showAnswers && didAnswer) {
        return correct.includes(idx) ? GOOD : BAD
      }
      return CHOICE
    }
  }
  return ''
}

export const Answer = ({
  setMessage,
  correct,
  didAnswer,
  index: idx,
  isSingle,
  isValid,
  resettable,
  setUserResponse,
  setAnswered,
  showAnswers,
  userResponse,
  children
}) => {
  console.log('answer', children, '>>', resettable)
  const [active, setActive] = useState(false)
  return (
    <Button
      onClick={e => {
        console.log('clicked', children, idx)
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
        }
        setActive(!active)
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

export const Question = props => {
  const {
    answerType,
    answers,
    bad,
    good,
    correct,
    explanation,
    point,
    question,
    type,
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
  console.log('question', question, 'resettable', resettable, 'these are questions')
  const submit = (
    <Button
      onClick={e => {
        e.preventDefault()
        if (!isSingle && userResponse.length < correct.length) {
          setMessage('Expected more choices.')
          return
        }
        answerQuestion({ question, userResponse, isValid })
        setAnswered(true)
        console.log('OH YEAH', isValid, userResponse, '<<<')
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
export const QuizCo = ({ quiz }) => {
  const [currentAnswer, answerQuestion] = useState(UNSET)
  const answerQ = pipe(trace('input'), answerQuestion)
  return (
    <Box as="section">
      <Box as="header">
        <strong>{quiz.title}</strong>
      </Box>
      <Box>
        <>
          {quiz.questions.map(
            (qq, i) =>
              console.log('>>>@>@>@', qq) || <Question {...qq} index={i} answerQuestion={answerQ} />
          )}
        </>
      </Box>
    </Box>
  )
}

export const Quiz = ({ title, synopsis, questions }) => {
  const quiz = makeQuiz({
    title,
    synopsis,
    questions,
    //*
    appLocale: {
      question: 'hey!',
      startQuizBtn: 'HEY START CHECK YES',
      resultPageHeaderText: '<correctIndexLength> / <questionLength>'
    },
    showInstantFeedback: false
    // */
  })
  console.log('QUIZZICAL', quiz)
  return <QuizCo quiz={quiz} />
}

Quiz.propTypes = {
  title: PropTypes.string,
  synopsis: PropTypes.string,
  questions: PropTypes.arrayOf(PropTypes.object)
}

Quiz.defaultProps = {
  title: 'Hey this is a quiz',
  synopsis: 'synopsis synopses syn op sis',
  questions: makeQuestionsFromObject({
    '"9876543210".split("").map(parseInt)': {
      type: 'text',
      answerType: 'single',
      answers: ['[9, NaN, NaN, NaN, NaN, 4, 3, 2, 1, 0]', '[9, 8, 7, 6, 5, 4, 3, 2, 1]'],
      correct: 0,
      explanation: 'parseInt is a binary function.'
    },
    'many whats?': {
      type: 'text',
      answerType: 'multiple',
      answers: 'abcd'.split(''),
      correct: [1, 3],
      explanation: 'you pick',
      resettable: true
    }
  })
}

export default Quiz
