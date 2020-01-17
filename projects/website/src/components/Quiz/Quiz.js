import React, { useState } from 'react'
import { pipe } from 'ramda'
import { trace } from 'xtrace'
import PropTypes from 'prop-types'
import { Box } from 'rebass'

import { UNSET } from './constants'
import Question from './Question'
import { makeQuiz, makeQuestionsFromObject } from './utils'

export const QuizCo = ({ quiz }) => {
  const [, answerQuestion] = useState(UNSET)
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

QuizCo.propTypes = { quiz: PropTypes.object }

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
