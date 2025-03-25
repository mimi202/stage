import { createSlice } from "@reduxjs/toolkit";
import data from "./questions_quiz_final.json";

const initialState = {
  user: {
    nom: "",
    prénom: "",
    score: 0,
    genre: "",
    email: "",
    académie: "",
    département: "",
    responsabilité: "",
    isAuthentificated: true,
  },
  currentQuestionIndex: 0,
  questions: data,

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
