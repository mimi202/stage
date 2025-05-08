import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import { updateUser } from "../redux/MySlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.quiz.user);

  const nomRef = useRef();
  const prenomRef = useRef();
  const emailRef = useRef();
  const responsabiliteRef = useRef();
  const [genre, setGenre] = useState("");
  const [academie, setAcademie] = useState("");
  const [departement, setDepartement] = useState("");

  // États pour gérer les erreurs
  const [errors, setErrors] = useState({});

  // Objet des académies et départements associés
  const academies = {
    "AREF Rabat-Salé-Kénitra": ["Rabat", "Salé", "Kénitra", "Skhirate-Témara"],
    "AREF Casablanca-Settat": [
      "Casablanca",
      "Settat",
      "Mohammedia",
      "El Jadida",
    ],
    "AREF Marrakech-Safi": ["Marrakech", "Safi", "Essaouira", "Youssoufia"],
    "AREF Tanger-Tétouan-Al Hoceima": ["Tanger", "Tétouan", "Al Hoceima"],
    "AREF Fès-Meknès": ["Fès", "Meknès", "Taza", "Sefrou"],
    "AREF Oriental": ["Oujda", "Nador", "Berkane", "Jerada"],
    "AREF Souss-Massa": ["Agadir", "Taroudant", "Tiznit"],
    "AREF Béni Mellal-Khénifra": ["Béni Mellal", "Khénifra", "Azilal"],
    "AREF Drâa-Tafilalet": ["Errachidia", "Ouarzazate", "Tinghir"],
    "AREF Laâyoune-Sakia El Hamra": ["Laâyoune", "Boujdour"],
    "AREF Dakhla-Oued Eddahab": ["Dakhla"],
  };

  const validateForm = () => {
    let newErrors = {};

    if (!nomRef.current.value) newErrors.nom = "Le nom est requis.";
    if (!prenomRef.current.value) newErrors.prenom = "Le prénom est requis.";
    if (!emailRef.current.value) newErrors.email = "L'email est requis.";
    if (!genre) newErrors.genre = "Veuillez sélectionner un genre.";
    if (!academie) newErrors.academie = "Sélectionnez une académie.";
    if (!departement) newErrors.departement = "Sélectionnez un département.";
    if (!responsabiliteRef.current.value)
      newErrors.responsabilite = "Sélectionnez une responsabilité.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const newUser = {
      nom: nomRef.current.value,
      prénom: prenomRef.current.value,
      genre: genre,
      email: emailRef.current.value,
      académie: academie,
      département: departement,
      responsabilité: responsabiliteRef.current.value,
    };

    dispatch(updateUser(newUser));
    handleNavigate();
  };

  const handleNavigate = () => {
    if (user.isAuthentificated) {
      navigate("/grtStarted");
    }
  };

  return (
    <form className="container my-5" onSubmit={handleLogin}>
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8 bg-light p-4 rounded shadow">
          <h4 className="text-center mb-4">Formulaire de Connexion</h4>

          {/* Nom */}
          <div className="mb-3">
            <label className="form-label">Nom :</label>
            <input type="text" className="form-control" ref={nomRef} />
            {errors.nom && <span className="text-danger">{errors.nom}</span>}
          </div>

          {/* Prénom */}
          <div className="mb-3">
            <label className="form-label">Prénom :</label>
            <input type="text" className="form-control" ref={prenomRef} />
            {errors.prenom && (
              <span className="text-danger">{errors.prenom}</span>
            )}
          </div>

          {/* Email */}
          <div className="mb-3">
            <label className="form-label">E-mail :</label>
            <input type="email" className="form-control" ref={emailRef} />
            {errors.email && (
              <span className="text-danger">{errors.email}</span>
            )}
          </div>

          {/* Genre */}
          <div className="mb-3">
            <label className="form-label me-3">Genre :</label>
            <br />
            <div className="form-check form-check-inline">
              <input
                id="f"
                type="radio"
                name="genre"
                value="Femme"
                className="form-check-input"
                onChange={(e) => setGenre(e.target.value)}
              />
              <label for="f" className="form-check-label">
                Femme
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                id="h"
                type="radio"
                name="genre"
                value="Homme"
                className="form-check-input"
                onChange={(e) => setGenre(e.target.value)}
              />
              <label for="h" className="form-check-label">
                Homme
              </label>
            </div>
            {errors.genre && <div className="text-danger">{errors.genre}</div>}
          </div>

          {/* Académie */}
          <div className="mb-3">
            <label className="form-label">Académie AREF :</label>
            <select
              className="form-select"
              value={academie}
              onChange={(e) => {
                setAcademie(e.target.value);
                setDepartement("");
              }}
            >
              <option value="">-- Sélectionnez une académie --</option>
              {Object.keys(academies).map((key) => (
                <option key={key} value={key}>
                  {key}
                </option>
              ))}
            </select>
            {errors.academie && (
              <span className="text-danger">{errors.academie}</span>
            )}
          </div>

          {/* Département */}
          <div className="mb-3">
            <label className="form-label">Département Provincial :</label>
            <select
              className="form-select"
              value={departement}
              onChange={(e) => setDepartement(e.target.value)}
              disabled={!academie}
            >
              <option value="">-- Sélectionnez un département --</option>
              {academie &&
                academies[academie].map((dep) => (
                  <option key={dep} value={dep}>
                    {dep}
                  </option>
                ))}
            </select>
            {errors.departement && (
              <span className="text-danger">{errors.departement}</span>
            )}
          </div>

          {/* Responsabilité */}
          <div className="mb-3">
            <label className="form-label">Responsabilité :</label>
            <select className="form-select" ref={responsabiliteRef}>
              <option value="">-- Sélectionnez une responsabilité --</option>
              <option value="directeur">Directeur</option>
              <option value="chef_service">Chef de service</option>
              <option value="inspecteur_pedagogique">
                Inspecteur pédagogique
              </option>
              <option value="enseignant">Enseignant</option>
              <option value="coordinateur_academique">
                Coordinateur académique
              </option>
              <option value="administrateur_scolaire">
                Administrateur scolaire
              </option>
              <option value="autre">Autre</option>
            </select>
            {errors.responsabilite && (
              <span className="text-danger">{errors.responsabilite}</span>
            )}
          </div>

          {/* Bouton */}
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
