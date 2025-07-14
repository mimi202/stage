import React from "react";
import { useSelector } from "react-redux";

function Profile() {
  const user = useSelector((state) => state.quiz.user);

  return (
    <div className="profile-container mt-5">
      <h2 className="text-center">Bienvenue {user.username}</h2>
      <p className="text-center">Vous êtes connecté !</p>
      {/* Affiche d'autres infos si besoin */}
    </div>
  );
}

export default Profile;

