import React from "react";
import { useNavigate } from "react-router-dom";

export default function Role() {
  const navigate = useNavigate();

  return (
    <div className="p-4 text-center">
      <h2>Choisissez votre rôle</h2>
      <button
        className="btn btn-success m-2"
        onClick={() => navigate("/login")}
      >
        Je suis utilisateur
      </button>
      <button
        className="btn btn-primary m-2"
        onClick={() => navigate("/admin-login")}
      >
        Je suis admin
      </button>
    </div>
  );
}
