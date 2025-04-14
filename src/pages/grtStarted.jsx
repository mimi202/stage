import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
export default function Start() {
  useEffect(() => {
    window.scrollTo(0, 0); // Cette ligne fait défiler la page en haut
  }, []);
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/quiz");
  };

  return (
    <div
      style={{
        height: "450px",
        marginX: "auto",
        display: "flex",
        justifyContent: "center", // Centrer horizontalement
        alignItems: "center", // Centrer verticalement
      }}
    >
      <button className="btn btn-warning" onClick={handleNavigate}>
        Commencer le Quiz
      </button>
    </div>
  );
}
