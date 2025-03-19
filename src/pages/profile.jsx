import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../redux/MySlice"; // Assurez-vous que votre slice redux a une action updateUser

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.quiz.user); // Récupérer l'utilisateur du store redux

  // État local pour stocker les nouvelles valeurs de l'utilisateur
  const [nom, setNom] = useState(user.nom);
  const [prenom, setPrenom] = useState(user.prénom);
  const [email, setEmail] = useState(user.email);
  const [genre, setGenre] = useState(user.genre);

  // Gérer la soumission du formulaire pour mettre à jour les informations de l'utilisateur
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { nom, prénom: prenom, genre, email };
    dispatch(updateUser(updatedUser)); // Mettre à jour l'utilisateur dans Redux
  };

  return (
    <div className="profile-container">
      <h2 className="text-center text-light">
        Bienvenue {prenom} {nom}
      </h2>
      <form onSubmit={handleSubmit} className="form w-50 mx-auto">
        <div className="form-group">
          <label className="form-label">Nom :</label>
          <input
            type="text"
            className="form-control my-2"
            value={nom}
            onChange={(e) => setNom(e.target.value)} // Mettre à jour l'état local
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Prénom :</label>
          <input
            type="text"
            className="form-control my-2"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)} // Mettre à jour l'état local
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">E-mail :</label>
          <input
            type="email"
            className="form-control my-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // Mettre à jour l'état local
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
                className="form-check-input mx-2"
                checked={genre === "Femme"}
                onChange={() => setGenre("Femme")} // Mettre à jour l'état local
                required
              />
              Femme
            </label>
            <label className="form-check-label mx-2">
              <input
                type="radio"
                name="genre"
                value="Homme"
                className="form-check-input mx-2"
                checked={genre === "Homme"}
                onChange={() => setGenre("Homme")} // Mettre à jour l'état local
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
