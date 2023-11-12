import React, { useState } from "react"
import Choices_Multiple from "./Choices_Multiple"
import Choices_Boolean from "./Choices_Boolean"
import { decode } from "html-entities"
import QuizResultPage from "../pages/QuizResultPage"
import "../styleSheets/quiz/quiz.css"

const Quiz = ({ quizData, quizType }) => {
  const [SessionQuestionIndex, setSessionQuestionIndex] = useState({
    current: 0,
    max: quizData.data.results.length - 1,
  })
  let { current, max } = SessionQuestionIndex
  const { question, correct_answer, incorrect_answers } =
    quizData.data.results[current]
  const decodedQuestion = decode(question)
  const isQuizFinished = () => current === max

  if (isQuizFinished()) return <QuizResultPage />

  return (
    <div className="quiz">
      <div className="question-container">{decodedQuestion}</div>
      {quizType === "boolean" && (
        <Choices_Boolean
          setSessionQuestionIndex={setSessionQuestionIndex}
          correctAnswer={correct_answer}
        />
      )}
      {quizType === "multiple" && (
        <Choices_Multiple
          setSessionQuestionIndex={setSessionQuestionIndex}
          correctAnswer={correct_answer}
          incorrectAnswers={incorrect_answers}
          question={decodedQuestion}
        />
      )}
    </div>
  )
}

export default Quiz
