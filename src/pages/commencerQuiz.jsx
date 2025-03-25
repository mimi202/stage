import { useNavigate } from "react-router-dom";

export default function CommencerQuiz() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/quiz");
  };
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <button
        className="btn btn-primary fs-5"
        type="button"
        onClick={handleNavigate}
      >
        Commencer maintenant
      </button>
    </div>
  );
}
