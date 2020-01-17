import { GOOD, BAD, CHOICE } from './constants'

export const checkIsValid = ({ userResponse, correct }) => userResponse === correct

export const prefix = ({ didAnswer, correct, idx, isSingle, showAnswers, userResponse }) => {
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
