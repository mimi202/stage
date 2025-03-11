import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "./MySlice.jsx";

const store = configureStore({
  reducer: { quiz: quizReducer },
});
export default store;
