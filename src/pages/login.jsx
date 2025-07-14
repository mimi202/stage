import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../redux/MySlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    if (!username || !password) {
      setErrors({ form: "Remplir tous les champs" });
      return;
    }
    try {
      const res = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) {
        setErrors({ form: "Nom d'utilisateur ou mot de passe incorrect" });
        return;
      }
      const data = await res.json();
      dispatch(updateUser({ username: data.username, isAuthentificated: true }));
      navigate("/profile");
    } catch (err) {
      setErrors({ form: "Erreur serveur" });
    }
  };

  return (
    <form className="container my-5" onSubmit={handleLogin}>
      <div className="row justify-content-center">
        <div className="col-12 col-md-8 bg-light p-4 rounded shadow">
          <h4 className="text-center mb-4">Connexion</h4>
          {errors.form && <div className="text-danger">{errors.form}</div>}
          <div className="mb-3">
            <label className="form-label">Nom d'utilisateur :</label>
            <input type="text" className="form-control" ref={usernameRef} />
          </div>
          <div className="mb-3">
            <label className="form-label">Mot de passe :</label>
            <input type="password" className="form-control" ref={passwordRef} />
          </div>
          <div className="text-center">
            <button className="btn btn-success px-5 mt-3" type="submit">
              Connexion
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Login;
