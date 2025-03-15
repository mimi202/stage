import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    nom: "fatna",
    prénom: "fadil",
    score: 0,
    genre: "f",
    cin: "hj",
    isAuthentificated: true,
  },
  currentQuestionIndex: 0,
  questions: [
    {
      id: 1,
      text: "Quel est le plus grand océan de la Terre ?",
      options: [
        {
          id: "a",
          text: "Océan Atlantique",
          isCorrect: false,
          isClicked: false,
        },
        { id: "b", text: "Océan Indien", isCorrect: false, isClicked: false },
        { id: "c", text: "Océan Pacifique", isCorrect: true, isClicked: false },
        { id: "d", text: "Océan Arctique", isCorrect: false, isClicked: false },
      ],
      selectedOption: null,
    },
    {
      id: 2,
      text: "Quel est l’élément chimique dont le symbole est O ?",
      options: [
        { id: "a", text: "Or", isCorrect: false, isClicked: false },
        { id: "b", text: "Oxygène", isCorrect: true, isClicked: false },
        { id: "c", text: "Osmium", isCorrect: false, isClicked: false },
        { id: "d", text: "Ozone", isCorrect: false, isClicked: false },
      ],
      selectedOption: null,
    },
    {
      id: 3,
      text: "Utiliser le même mot de passe pour plusieurs comptes est une bonne pratique de sécurité ?",
      options: [
        { id: "a", text: "vrai", isCorrect: false, isClicked: false },
        { id: "b", text: "faux", isCorrect: true, isClicked: false },
      ],
      selectedOption: null,
    },
  ],
  isQuizFinished: false,
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
    },
    onChooseAnswer: (state, action) => {
      const { opId, currentQuestionIndex } = action.payload;
      const currentQuestion = state.questions[currentQuestionIndex];
      const selectedOption = currentQuestion.options.find(
        (op) => op.id === opId
      );
      console.log(selectedOption);
      state.questions[currentQuestionIndex] = {
        ...state.questions[currentQuestionIndex],
        selectedOption,
      };

      if (selectedOption) {
        selectedOption.isClicked = true;
      }

      const ifCorrect = selectedOption.isCorrect;
      if (ifCorrect) {
        state.user.score += 1;
      }
    },
    nextQuestion: (state) => {
      if (state.currentQuestionIndex < state.questions.length - 1) {
        state.currentQuestionIndex += 1;
      } else {
        state.isQuizFinished = true;
      }
    },
  },
});
export const {
  userLogin,
  userLogout,
  nextQuestion,
  updateUser,
  onChooseAnswer,
} = quizSlice.actions;
export default quizSlice.reducer;
