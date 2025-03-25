import { useDispatch } from "react-redux";
import { userLogout } from "../redux/MySlice";
export default function Logout() {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(userLogout());
  };
  return (
    <>
      <h3 className="text-light">Voulez-vous vraiment vous déconnecter ?</h3>
      <button className="btn btn-secondary" onClick={handleLogout}>
        Se déconnecter
      </button>
      <button className="btn btn-secondary"> Annuler </button>
    </>
  );
}
