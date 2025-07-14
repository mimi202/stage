import { useDispatch } from "react-redux";
import { userLogout } from "../redux/MySlice";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(userLogout());
    navigate("/login");
  };
  const handleAnnuler = () => {
    window.history.back();
  };

  return (
    <div className="container text-center mt-5">
      <h3>Voulez-vous vraiment vous déconnecter ?</h3>
      <button className="btn btn-secondary mx-3" onClick={handleLogout}>
        Se déconnecter
      </button>
      <button className="btn btn-danger" onClick={handleAnnuler}>
        Annuler
      </button>
    </div>
  );
}
