import { useState, useRef } from "react"
import { useDispatch } from "react-redux"
import { actions as quizSettingsActions } from "../redux/reducers/quizSettingsSlice"
import { useNavigate } from "react-router-dom"
import "../styleSheets/type-NOQ-page/type-NOQ-page.css"

const QuizType_and_NumberOfQuestions = () => {
  const [numberOfQuestion, setNumberOfQuestion] = useState(6)

  const [typeOfQuestions, setTypeOfQuestions] = useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const updateType_and_numberOfQuestions_inStore = () => {
    dispatch(quizSettingsActions.setType(typeOfQuestions))
    dispatch(quizSettingsActions.setAmount(String(numberOfQuestion)))
  }

  const select_Type_and_numberOfQuestions = () => {
    if (!typeOfQuestions) {
      alert("Please select a Question Type")
      return
    }
    updateType_and_numberOfQuestions_inStore()
    navigate("/quiz-session")
  }

  const CalculateRangeCounterPosition = (e) => {
    const rect = e.target.getBoundingClientRect()
    const rangeWidth = NOQ.current.offsetWidth
    let x = e.clientX - rect.x
    if (x < 0) x = 0
    if (x > rangeWidth) x = rangeWidth
    placeRangeCounterAtCorrespondingPosition(x)
  }

  const placeRangeCounterAtCorrespondingPosition = (x) => {
    NOQ.current.style.setProperty("--x", `${x - 20}px`)
  }

  //NOQ means Number of Questions
  const NOQ = useRef()
  const NOQ_COUNTER = useRef()

  const isShowingCounter = NOQ_COUNTER.current?.classList.contains("show")

  const NOQRangeDrag = (e) => {
    const target = e.target
    CalculateRangeCounterPosition(e)
    NOQ_COUNTER.current.classList.add("show")
    target.onpointermove = (e) => {
      CalculateRangeCounterPosition(e)
    }
  }

  const removeRangeDrag = (e) => {
    const target = e.target
    target.onpointermove = null
    NOQ_COUNTER.current.classList.remove("show")
  }

  return (
    //acrunom for Type and Number Of Qestions
    <div className="T-NOQ-page">
      <div className="T-NOQ-page__title">
        <h2>Type & Number Of Questions</h2>
        <small>please choose pwiiis</small>
      </div>
      <div className="T-NOQ-page__type-container">
        <div
          onClick={() => setTypeOfQuestions("multiple")}
          className={`type-container__type ${
            typeOfQuestions === "multiple" ? "selected" : ""
          }`}
        >
          Multiple Choice
        </div>
        <div
          onClick={() => setTypeOfQuestions("boolean")}
          className={`type-container__type ${
            typeOfQuestions === "boolean" ? "selected" : ""
          }`}
        >
          True/False
        </div>
        <div
          onClick={() => setTypeOfQuestions("0")}
          className={`type-container__type ${
            typeOfQuestions === "0" ? "selected" : ""
          }`}
        >
          Mixed
        </div>
      </div>
      <div ref={NOQ} className="T-NOQ-page__NOQ">
        <p>How many questions would you like to be asked?</p>
        <input
          className="NOQ__range"
          onChange={(e) => setNumberOfQuestion(e.target.value)}
          onPointerDown={(e) => NOQRangeDrag(e)}
          onPointerUp={(e) => removeRangeDrag(e)}
          type="range"
          min={1}
          max={20}
          value={numberOfQuestion}
        />
        <div className="NOQ__counter" ref={NOQ_COUNTER}>
          {isShowingCounter && numberOfQuestion}
        </div>
      </div>
      <div className="session-start-btn-container">
        <button
          onClick={select_Type_and_numberOfQuestions}
          className="start-btn"
        >
          Start Your Quiz Session
        </button>
        <div className="beat-effect"></div>
      </div>
    </div>
  )
}

export default QuizType_and_NumberOfQuestions
