import { useSelector } from "react-redux";

export default function Quiz() {
  const state = useSelector((state) => state.quiz);
  return (
    <>
      <h1 className="m-2 " style={{ color: "#212E53" }}>
        Quiz de Cybersécurité
      </h1>
      <h6 className="m-2 my-4" style={{ color: "#212E53" }}>
        {" "}
        Question {state.currentQuestionIndex + 1}:
      </h6>
      <h4 className="m-2">
        {state.questions[state.currentQuestionIndex].text}
      </h4>
    </>
  );
}
