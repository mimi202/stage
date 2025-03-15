import { useDispatch, useSelector } from "react-redux";
import { onChooseAnswer, nextQuestion } from "../redux/MySlice";

export default function Quiz() {
  const state = useSelector((state) => state.quiz);
  const dispatch = useDispatch();
  const isQuizFinished = state.isQuizFinished;
  const score = state.user.score;
  const currentQuestionIndex = state.currentQuestionIndex;
  const currentQuestion = state.questions[currentQuestionIndex];
  const options = currentQuestion.options;

  const selectedOption = currentQuestion.selectedOption;
  /* const handleBackground = (op) => {
    let style = "none";

    if (op) {
      // const falseQuestions=currentQuestion.options.map((op)=>op.isClicked && op.isCorrect===false)
      if (op.isCorrect === false && op.isClicked === true) {
        style = "red";
      } else if (op.isCorrect) {
        style = "green";
      }
    }
    return style;
  }; */

  const handleOptionClick = (opId) => {
    dispatch(onChooseAnswer({ opId, currentQuestionIndex }));
  };
  const handleNextQuestion = () => {
    dispatch(nextQuestion());
  };
  if (isQuizFinished) {
    return (
      <div className="pt-5  text-center">
        <h2>Le quiz est terminé !</h2>
        <h3 style={{ marginTop: "50px" }}>
          Votre score est :
          <b>
            {score}/{state.questions.length}{" "}
          </b>
        </h3>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: "500px" }}>
      <h1 className="m-2 " style={{ color: "#212E53" }}>
        Quiz de Cybersécurité
      </h1>
      <div
        style={{
          backgroundColor: "#709CA7",
          paddingBottom: "200px",
          border: "1px solid grey",
          borderRadius: "20px",
        }}
      >
        <h6 className="m-2 my-4" style={{ color: "#212E53" }}>
          Question {state.currentQuestionIndex + 1}/{state.questions.length}:
        </h6>
        <h4 className="m-5">
          {state.questions[state.currentQuestionIndex].text}
        </h4>
        {state.questions[state.currentQuestionIndex].options.map((op) => (
          <>
            <button
              type="button"
              className="btn btn-secondary d-block w-75 mx-auto"
              key={op.id}
              disabled={selectedOption !== null}
              onClick={() => handleOptionClick(op.id)}
              style={{
                backgroundColor:
                  selectedOption !== null
                    ? op.isCorrect
                      ? "green" // If the answer is correct, it will always be green
                      : op.isClicked
                      ? "red" // If the answer is clicked and incorrect, it will be red
                      : "grey" // If the option is neither clicked nor correct, it will be grey
                    : "#EBACA2",
              }}
            >
              {op.text}
            </button>
            <br />
          </>
        ))}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <button
            style={{
              border: "none",
              backgroundColor: "#709CA7",
              padding: "10px",
              marginTop: "30px",
              marginRight: "50px",
            }}
            disabled={selectedOption === null}
          >
            <i
              className="fa-solid fa-arrow-right fa-4x"
              title="Suivant"
              onClick={handleNextQuestion}
            ></i>
          </button>
        </div>
      </div>
    </div>
  );
}
