import { useDispatch, useSelector } from "react-redux";
import { onChooseAnswer, nextQuestion, onValidate } from "../redux/MySlice";

export default function Quiz() {
  const state = useSelector((state) => state.quiz);
  const dispatch = useDispatch();
  const isQuizFinished = state.isQuizFinished;
  const score = state.user.score;
  const currentQuestionIndex = state.currentQuestionIndex;
  const currentQuestion = state.questions[currentQuestionIndex];
  const options = currentQuestion.options;
  const isValidate = currentQuestion.isValidate;
  const selectedOption = currentQuestion.selectedOption;

  const handlValidate = (currentQuestionIndex) => {
    dispatch(onValidate(currentQuestionIndex));
  };

  const handleOptionClick = (opId) => {
    dispatch(onChooseAnswer({ opId, currentQuestionIndex }));
  };

  const handleNextQuestion = () => {
    dispatch(nextQuestion());
  };

  if (isQuizFinished) {
    return (
      <div
        style={{
          paddingTop: "50px",
          textAlign: "center",
          backgroundColor: "#F4F0E3",
          height: "300px",
          borderRadius: "10px",
        }}
        // className="pt-5 text-center bg bg-secondary h-75"
      >
        <h2>Le quiz est terminé !</h2>
        <h3 style={{ marginTop: "50px" }}>
          Votre score est :
          <b>
            {score}/{state.questions.length}
          </b>
          <br />
          {score > 19 ? (
            <i className="fa-solid fa-check" style={{ color: "#349122" }}></i>
          ) : (
            <i
              className="fa-regular fa-circle-xmark"
              style={{ color: " #c2260a" }}
            ></i>
          )}
        </h3>
      </div>
    );
  }

  return (
    <div style={{ maxHeight: "fit-content" }}>
      <h1 className="m-2 ">Quiz de Cybersécurité</h1>
      <div
        style={{
          backgroundColor: "rgb(147, 149, 151,0.5)",
          paddingBottom: "30px",
          border: "1px solid grey",
          borderRadius: "20px",
          // maxHeight: "fit-content",
        }}
      >
        <h6 className="m-2 my-3 ">
          Question {state.currentQuestionIndex + 1}/{state.questions.length}:
        </h6>
        <h4 className="m-3 ">
          {state.questions[state.currentQuestionIndex].text}
        </h4>

        {options.map((op) => {
          let labelColor = "#fff";
          let textColor = "#000";
          if (isValidate) {
            if (currentQuestion.correctAnswers.includes(op.id)) {
              labelColor = "green";
              textColor = "#fff";
            } else if (selectedOption.includes(op.id)) {
              labelColor = "red";
              textColor = "#fff";
            }
          }

          return (
            <div key={op.id} className="d-flex align-items-center w-75 mx-auto">
              <input
                id={`Q${op.id}`}
                type="checkbox"
                disabled={isValidate === true}
                checked={selectedOption.includes(op.id)}
                onChange={() => handleOptionClick(op.id)}
                style={{
                  marginRight: "10px",
                  transform: "scale(1.5)",
                  accentColor: "blue",
                }}
              />
              <label
                htmlFor={`Q${op.id}`}
                className="btn d-block w-100 my-2"
                style={{ backgroundColor: labelColor, color: textColor }}
              >
                {op.text}
              </label>
            </div>
          );
        })}

        <div className="text-center mt-4">
          <button
            onClick={() => handlValidate(currentQuestionIndex)}
            className="btn btn-primary"
            disabled={selectedOption.length === 0}
          >
            Valider
          </button>
        </div>
        <div className="text-center mt-4">
          <button
            className="btn btn-primary"
            onClick={() => handleNextQuestion()}
            disabled={isValidate === false || selectedOption.length === 0}
          >
            Passer à la question suivante
          </button>
        </div>
      </div>
    </div>
  );
}
