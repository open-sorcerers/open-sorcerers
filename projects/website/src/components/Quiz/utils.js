import { pipe, toPairs, map, merge } from 'ramda'

const makeQuestion = ({
  answerType = 'single',
  answers = [],
  bad = 'Incorrect',
  correct,
  explanation = '',
  good = 'Correct',
  point = 1,
  question = '',
  type = 'text',
  resettable = false
}) => ({
  answerType,
  answers,
  bad,
  correct,
  explanation,
  good,
  point,
  question,
  type,
  resettable
})
/*
({
  question,
  questionType: type,
  answerSelectionType: answerType,
  answers,
  correctAnswer: correct,
  messageForCorrectAnswer: good,
  messageForIncorrectAnswer: bad,
  explanation,
  point
})
*/

const makeQuiz = x => x
/*
const makeQuiz = ({ title, synopsis, questions, ...also }) => ({
  quizTitle: title,
  quizSynopsis: synopsis,
  questions,
  ...also
})
*/

const makeQuestionsFromObject = pipe(
  toPairs,
  map(([question, qData]) =>
    makeQuestion(
      merge(
        {
          question
        },
        qData
      )
    )
  )
)

export { makeQuestion, makeQuestionsFromObject, makeQuiz }
