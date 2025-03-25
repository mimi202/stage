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
      navigate("/commencerQuiz");
    }
  };

  return (
    <form className="form w-50 mx-auto">
      <div className="form-group">
        <label className="form-label text-light">Nom :</label>
        <input type="text" className="form-control my-2" ref={nomRef} />
        {errors.nom && <span className="text-danger">{errors.nom}</span>}
      </div>

      <div>
        <label className="form-label text-light">Prénom :</label>
        <input type="text" className="form-control my-2" ref={prenomRef} />
        {errors.prenom && <span className="text-danger">{errors.prenom}</span>}
      </div>

      <div className="form-group">
        <label className="form-label text-light">E-mail :</label>
        <input type="email" className="form-control my-2" ref={emailRef} />
        {errors.email && <span className="text-danger">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label className="form-check-label text-light">
          <input
            type="radio"
            name="genre"
            value="Femme"
            className="form-check-input mx-2 my-2"
            onChange={(e) => setGenre(e.target.value)}
          />
          Femme
        </label>

        <label className="form-check-label text-light">
          <input
            type="radio"
            name="genre"
            value="Homme"
            className="form-check-input mx-2 my-2"
            onChange={(e) => setGenre(e.target.value)}
          />
          Homme
        </label>
        {errors.genre && (
          <span className="text-danger d-block">{errors.genre}</span>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label text-light">Académie AREF</label>
        <select
          className="form-select"
          value={academie}
          onChange={(e) => {
            setAcademie(e.target.value);
            setDepartement(""); // Réinitialiser le département lorsqu'on change d'académie
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

      <div className="mb-3">
        <label className="form-label text-light">Département Provincial</label>
        <select
          className="form-select"
          value={departement}
          onChange={(e) => setDepartement(e.target.value)}
          disabled={!academie} // Désactiver le select si aucune académie n'est choisie
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

      <div className="mb-3">
        <label className="form-label text-light">Responsabilité</label>
        <select className="form-select" ref={responsabiliteRef}>
          <option value="">-- Sélectionnez une responsabilité --</option>
          <option value="directeur">Directeur</option>
          <option value="chef_service">Chef de service</option>
          <option value="inspecteur_pedagogique">Inspecteur pédagogique</option>
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

      <button
        onClick={handleLogin}
        className="btn btn-success d-block mx-auto px-4 my-4"
      >
        Connexion
      </button>
    </form>
  );
}

export default Login;
