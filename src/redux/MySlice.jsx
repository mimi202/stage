import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    nom: "",
    prénom: "",
    score: "",
    genre: "",
    cin: "",
    isAuthentificated: false,
  },
  currentQuestionIndex: 0,
  questions: [
    {
      id: 1,
      text: "Quel est le plus grand océan de la Terre ?",
      options: [
        { id: "a", text: "Océan Atlantique", isCorrect: false },
        { id: "b", text: "Océan Indien", isCorrect: false },
        { id: "c", text: "Océan Pacifique", isCorrect: true },
        { id: "d", text: "Océan Arctique", isCorrect: false },
      ],
      selectedOption: null,
    },
  ],
};
const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    userLogout: (state) => {
      state.user.isAuthentificated = false;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      state.user.isAuthentificated = true;
      console.log(state.user);
    },
  },
});
export const { userLogin, userLogout, updateUser } = quizSlice.actions;
export default quizSlice.reducer;
