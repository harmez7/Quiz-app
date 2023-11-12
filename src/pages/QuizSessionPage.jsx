import { lazy, Suspense, useEffect, useState } from "react"
import useQuizData from "../hooks/useQuizData"
import Loading from "../components/Loading"
import useAssembleQuizSessionURL from "../hooks/useAssembleQuizSessionURL"
import Quiz from "../components/Quiz"
import "../styleSheets/quiz-session-page/quiz-session-page.css"

const Modal = lazy(() => delay(import("../components/Modal")))

const delay = async (promise) => {
  await new Promise((resolve) => {
    setTimeout(resolve, 1000)
  })
  return promise
}

const QuizSessionPage = () => {
  const { url, isURLValid, type: quizType } = useAssembleQuizSessionURL()
  const {
    data: quizData,
    isSuccess: dataIsAvailble,
    isError,
    error,
  } = useQuizData(url, isURLValid)

  if (!isURLValid)
    return (
      <Suspense fallback={<Loading />}>
        <Modal />
      </Suspense>
    )

  if (isError) return <div>{error}</div>
  if (!dataIsAvailble) return

  return (
    <>
      {/* {isQuizSessionFinished() && <QuizResultPage />} */}
      {isURLValid && dataIsAvailble && (
        <div className="quiz-session-page">
          <Quiz quizData={quizData} quizType={quizType} />
        </div>
      )}
    </>
  )
}

export default QuizSessionPage
