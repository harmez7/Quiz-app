import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6"
import { useDispatch } from "react-redux"
import PropTypes from "prop-types"
import { actions as quizResultsActions } from "../redux/reducers/quizResultsSlice"
import "../styleSheets/choices-boolean/choices-boolean.css"

const Choices_Boolean = ({ correctAnswer, setSessionQuestionIndex }) => {
  const dispatch = useDispatch()
  const handleThatShit = (e) => {
    const userAnswer = e.currentTarget.dataset.bool
    // console.log(userAnswer, correctAnswer)
    const isUserAnswerCorrect = userAnswer == correctAnswer
    dispatch(quizResultsActions.add(isUserAnswerCorrect))
    setSessionQuestionIndex((state) => {
      return {
        ...state,
        current: state.current + 1,
      }
    })
  }

  return (
    <div className="boolean-choices">
      <div className="boolean-choices__choice">
        <FaCircleCheck
          data-bool="True"
          className="true-symbol"
          onClick={(e) => handleThatShit(e)}
        />
      </div>
      <div className="boolean-choices__choice">
        <FaCircleXmark
          data-bool="False"
          className="false-symbol"
          onClick={(e) => handleThatShit(e)}
        />
      </div>
    </div>
  )
}

Choices_Boolean.propTypes = {
  correctAnswer: PropTypes.string,
  setSessionQuestionIndex: PropTypes.func,
}

export default Choices_Boolean
