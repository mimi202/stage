import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    nom: "",
    prénom: "",
    score: "",
    isAuthentificated: false,
  },
  questions: [
    {
      id: "",
      text: "",
      options: [
        { id: "a", text: "HTTP", isCorrect: false },
        { id: "b", text: "HTTPS", isCorrect: true },
        { id: "c", text: "FTP", isCorrect: false },
        { id: "d", text: "SMTP", isCorrect: false },
      ],
      selectedOption: null,
    },
  ],
};
const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {},
});
export default quizSlice.reducer;
