import { createSlice } from "@reduxjs/toolkit"

const quizResultsSlice = createSlice({
  name: "quiz-results",
  initialState: [],
  reducers: {
    add: (state, { payload }) => {
      state.push(payload)
    },
  },
})

export const { reducer, actions } = quizResultsSlice
