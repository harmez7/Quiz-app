import { useDispatch } from "react-redux"
import { actions as quizDataActions } from "../redux/reducers/quizDateSlice"

import "../styleSheets/choices-multiple/choices-multiple.css"

const Choices_Multiple = ({
  setSessionQuestionIndex,
  question,
  correctAnswer,
  incorrectAnswers,
}) => {
  const dispatch = useDispatch()
  const chioceElements = Array.from([...incorrectAnswers, correctAnswer])
    .sort(() => Math.random() - 0.5)
    .map((choice, index) => (
      <div
        className="choice"
        key={index}
        onClick={() => handleChoiceSelecting(choice)}
      >
        {choice}
      </div>
    ))

  const handleChoiceSelecting = (userAnswer) => {
    const isUserAnswerCorrect = userAnswer === correctAnswer
    // console.log(isUserAnswerCorrect)
    dispatch(
      quizDataActions.update({
        question,
        userAnswer,
        correctAnswer,
        userQuizResult: isUserAnswerCorrect,
      })
    )

    setSessionQuestionIndex((state) => {
      return {
        ...state,
        current: state.current + 1,
      }
    })
  }

  return <div className="multiple-choices">{chioceElements}</div>
}

export default Choices_Multiple
