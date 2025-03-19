import { useNavigate } from "react-router-dom";

export default function CommencerQuiz() {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/quiz");
  };
  return (
    <div className="mx auto">
      <button
        className="btn btn-primary mx-5 fs-5"
        type="button"
        onClick={handleNavigate}
      >
        Commencer maintenant
      </button>
    </div>
  );
}
