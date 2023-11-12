import { configureStore } from "@reduxjs/toolkit"
import { reducer as quizeSettingsReducer } from "./reducers/quizSettingsSlice"
// import { reducer as quizResultsReducer } from "./reducers/quizResultsSlice"
import { reducer as quizDataReducer } from "./reducers/quizDateSlice"

const store = configureStore({
  reducer: {
    quizSettings: quizeSettingsReducer,
    // quizResults: quizResultsReducer,
    quizData: quizDataReducer,
  },
})

export default store
