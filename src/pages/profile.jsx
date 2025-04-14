import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/MySlice";

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.quiz.user);

  const [nom, setNom] = useState(user.nom);
  const [prenom, setPrenom] = useState(user.prénom);
  const [email, setEmail] = useState(user.email);
  const [genre, setGenre] = useState(user.genre);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { nom, prénom: prenom, genre, email };
    dispatch(updateUser(updatedUser));
  };

  return (
    <div className="profile-container">
      <h2 className="text-center ">
        Bienvenue {prenom} {nom}
      </h2>
      <form onSubmit={handleSubmit} className="form w-50 mx-auto shadow-5">
        <div className="form-group">
          <label className="form-label">Nom :</label>
          <input
            type="text"
            className="form-control my-2 shadow-lg"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Prénom :</label>
          <input
            type="text"
            className="form-control my-2 shadow-lg"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">E-mail :</label>
          <input
            type="email"
            className="form-control my-2 shadow-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Genre :</label>
          <div>
            <label className="form-check-label">
              <input
                type="radio"
                name="genre"
                value="Femme"
                className="form-check-input mx-2 shadow-lg"
                checked={genre === "Femme"}
                onChange={() => setGenre("Femme")}
                required
              />
              Femme
            </label>
            <label className="form-check-label mx-2">
              <input
                type="radio"
                name="genre"
                value="Homme"
                className="form-check-input mx-2 shadow-lg"
                checked={genre === "Homme"}
                onChange={() => setGenre("Homme")}
                required
              />
              Homme
            </label>
          </div>
        </div>
        <div className="form-group">
          <button
            type="submit"
            className="btn btn-primary d-block mx-auto my-4"
          >
            Mettre à jour
          </button>
        </div>
      </form>
    </div>
  );
}

export default Profile;
