import { useDispatch } from "react-redux";
import { userLogout } from "../redux/MySlice";
import { useNavigate } from "react-router-dom";
export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(userLogout());
    navigate("/");
  };
  const handleAnnuler = () => {
    window.history.back();
  };
  return (
    <div
      style={{
        border: "1px solid black",
        backgroundColor: "#e5e7e6",
        textAlign: "center",
        borderRadius: "10px",
        width: "700px",
        height: "150px",
        margin: "auto",
        marginTop: "10px",
        paddingTop: "10px",
      }}
    >
      <h3 className=" pb-4">Voulez-vous vraiment vous déconnecter ?</h3>
      <button
        className="btn btn-secondary mx-5"
        style={{ backgroundColor: "#5D7052" }}
        onClick={handleLogout}
      >
        Se déconnecter
      </button>
      <button
        className="btn btn-secondary"
        style={{ backgroundColor: "#7D0E13" }}
        onClick={handleAnnuler}
      >
        Annuler
      </button>
    </div>
  );
}
