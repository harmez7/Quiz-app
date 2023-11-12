import { createSlice } from "@reduxjs/toolkit"

const quizDateSlice = createSlice({
  name: "quiz-data",
  initialState: {
    questions: [],
    userAnswers: [],
    correctAnswers: [],
    userQuizResults: [],
  },
  reducers: {
    update: (state, { payload }) => {
      return {
        questions: [...state.questions, payload.question],
        userAnswers: [...state.userAnswers, payload.userAnswer],
        correctAnswers: [...state.correctAnswers, payload.correctAnswer],
        userQuizResults: [...state.userQuizResults, payload.userQuizResult],
      }
    },
  },
})

export const { actions, reducer } = quizDateSlice
