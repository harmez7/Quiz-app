import { useSelector } from "react-redux"
import "../styleSheets/quiz-result-detail/quiz-result-detail.css"

const QuizResultDetail = ({ isShowing }) => {
  const quizData = useSelector((state) => state.quizData)
  const { questions, userQuizResults, userAnswers, correctAnswers } = quizData

  //create table rows
  const resultTable = questions.map((question, index) => {
    //give the propiate className
    const correctOrIncorrect = userQuizResults[index] ? "correct" : "incorrect"
    return (
      <tr className="table__row" key={index}>
        <td className="table__element">{question}</td>
        <td className={`table__element ${correctOrIncorrect}`}>
          {userAnswers[index]}
        </td>
        <td className={`table__element ${correctOrIncorrect}`}>
          {correctAnswers[index]}
        </td>
      </tr>
    )
  })

  return (
    <div className={`quiz-result-page__detail ${isShowing ? "show" : ""}`}>
      <table className="table">
        <thead className="table__head">
          <tr className="table__row">
            <th className="head__element">Question</th>
            <th className="head__element">Your Answer</th>
            <th className="head__element">Correct Answer</th>
          </tr>
        </thead>
        <tbody className="table__body">{resultTable}</tbody>
      </table>
    </div>
  )
}

export default QuizResultDetail
