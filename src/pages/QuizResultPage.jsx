import React, { Suspense, useRef, useState, lazy } from "react"
import { useEffect } from "react"
import { useSelector } from "react-redux/es/hooks/useSelector"
import CountUp from "react-countup"
import { BsChevronDoubleDown } from "react-icons/bs"
import "../styleSheets/quiz-result-page/quiz-result-page.css"
const QuizResultDetail = lazy(() => import("../components/QuizResultDetail"))

const QuizResultPage = () => {
  const { userQuizResults } = useSelector((state) => state.quizData)
  const scoreBar = useRef()
  const [isShowingDetail, setIsShowingDetail] = useState(false)
  const userCorrectAnswers = userQuizResults.filter((result) => result)
  //calculate the % of user correct asnwers
  const userCorrectAnswersPrecentage = Math.round(
    (userCorrectAnswers.length / userQuizResults.length) * 100
  )
  //calculate the correct score bar length - 375 is stroke-dasharray/stroke-dashoffset
  const scoreBarLengthCalculation =
    375 - (375 * userCorrectAnswersPrecentage) / 100
  const scoreBarColor = () => {
    const prec = userCorrectAnswersPrecentage
    if (prec <= 25) return "red"
    if (prec > 25 && prec <= 50) return "yellow"
    if (prec > 50 && prec <= 75) return "green"
    if (prec > 75) return "blue"
  }
  const scoreReactionText = () => {
    switch (scoreBarColor()) {
      case "red":
        return "Bad luck! Maybe try again?"
      case "yellow":
        return "Well done! Want to try again?"
      case "green":
        return "Awesome! You DO know things!"
      case "blue":
        return "Perfect! You should give yourself a treat!"
      default:
        return "Oops something went wrong"
    }
  }
  const showDetail = () => {
    setIsShowingDetail(true)
  }
  useEffect(() => {
    scoreBar.current.style.setProperty("--calc", scoreBarLengthCalculation)
  })

  return (
    <div className={`quiz-result-page`}>
      <div
        className={`quiz-result-page__score ${isShowingDetail ? "hide" : ""}`}
      >
        <h2>Your Score</h2>
        <div className="score__score-container">
          <div className="score__score-demo">
            <div className="score-demo__bg"></div>
            <div className="score-demo__score-bar">
              <svg className="score-bar__svg">
                <circle
                  style={{ stroke: scoreBarColor() }}
                  cx="70"
                  cy="70"
                  r="60"
                  className="score-bar__bar"
                  ref={scoreBar}
                />
              </svg>
            </div>
            <CountUp
              className="score-demo__score-precentage"
              delay={0.3}
              end={userCorrectAnswersPrecentage}
              suffix={"%"}
            />
          </div>
          <div className="score-bar-reaction">{scoreReactionText()}</div>
        </div>
        <div className="score-show-detail" onClick={showDetail}>
          <BsChevronDoubleDown className="score-show-detail__btn" />
          <p className="score-show-detail__text">Detail</p>
        </div>
      </div>
      {isShowingDetail && (
        <Suspense fallback={null}>
          <QuizResultDetail isShowing={isShowingDetail} />
        </Suspense>
      )}
    </div>
  )
}

export default QuizResultPage
