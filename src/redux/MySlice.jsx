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
      correctAnswers: ["c", "d"],
      isValidate: false,
      selectedOption: [],
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
      correctAnswers: ["b"],
      selectedOption: [],
      isValidate: false,
    },
    {
      id: 3,
      text: "Utiliser le même mot de passe pour plusieurs comptes est une bonne pratique de sécurité ?",
      options: [
        { id: "a", text: "vrai", isCorrect: false, isClicked: false },
        { id: "b", text: "faux", isCorrect: true, isClicked: false },
      ],
      correctAnswers: ["b"],
      selectedOption: [],
      isValidate: false,
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
    onValidate: (state, action) => {
      const currentQuestionIndex = action.payload;

      if (
        !Array.isArray(state.questions) ||
        !state.questions[currentQuestionIndex]
      ) {
        console.error(
          "Index invalide ou questions non définies",
          currentQuestionIndex
        );
        return;
      }

      const currentQuestion = state.questions[currentQuestionIndex];
      currentQuestion.isValidate = true;
      console.log(currentQuestion.isValidate);
      console.log("state.questions:", state.questions);
      console.log("currentQuestionIndex:", currentQuestionIndex);

      const isCorrect =
        currentQuestion.selectedOption.length ===
          currentQuestion.correctAnswers.length &&
        currentQuestion.selectedOption.every((id) =>
          currentQuestion.correctAnswers.includes(id)
        );

      if (isCorrect) {
        state.user.score += 1;
      }
    },
    onChooseAnswer: (state, action) => {
      const { opId, currentQuestionIndex } = action.payload;
      const currentQuestion = state.questions[currentQuestionIndex];

      if (!currentQuestion) {
        console.error(
          "Question introuvable pour l'index:",
          currentQuestionIndex
        );
        return;
      }

      if (currentQuestion.selectedOption.includes(opId)) {
        // Désélectionner l'option
        currentQuestion.selectedOption = currentQuestion.selectedOption.filter(
          (id) => id !== opId
        );
      } else {
        // Ajouter l'option sélectionnée
        currentQuestion.selectedOption.push(opId);
      }

      // Mettre à jour l'état de isClicked pour chaque option
      currentQuestion.options.forEach((option) => {
        option.isClicked = currentQuestion.selectedOption.includes(option.id);
      });
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
  onValidate,
  userLogout,
  nextQuestion,
  updateUser,
  onChooseAnswer,
} = quizSlice.actions;
export default quizSlice.reducer;
