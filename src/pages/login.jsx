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
  const academieRef = useRef();
  const departementRef = useRef();
  const responsabiliteRef = useRef();
  const [genre, setGenre] = useState("");

  // États pour gérer les erreurs
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let newErrors = {};

    if (!nomRef.current.value) newErrors.nom = "Le nom est requis.";
    if (!prenomRef.current.value) newErrors.prenom = "Le prénom est requis.";
    if (!emailRef.current.value) newErrors.email = "L'email est requis.";
    if (!genre) newErrors.genre = "Veuillez sélectionner un genre.";
    if (!academieRef.current.value)
      newErrors.academie = "Sélectionnez une académie.";
    if (!departementRef.current.value)
      newErrors.departement = "Sélectionnez un département.";
    if (!responsabiliteRef.current.value)
      newErrors.responsabilite = "Sélectionnez une responsabilité.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    if (!validateForm()) return; // Si erreurs, on arrête l'envoi

    const newUser = {
      nom: nomRef.current.value,
      prénom: prenomRef.current.value,
      genre: genre,
      email: emailRef.current.value,
      académie: academieRef.current.value,
      département: departementRef.current.value,
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
        <select className="form-select" ref={academieRef}>
          <option value="">-- Sélectionnez une académie --</option>
          <option value="AREF1">Académie de Rabat-Salé-Kénitra</option>
          <option value="AREF2">Académie de Casablanca-Settat</option>
          <option value="AREF3">Académie de Marrakech-Safi</option>
        </select>
        {errors.academie && (
          <span className="text-danger">{errors.academie}</span>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label text-light">Département Provincial</label>
        <select className="form-select" ref={departementRef}>
          <option value="">-- Sélectionnez un département --</option>
          <option value="dep1">Province de Rabat</option>
          <option value="dep2">Province de Salé</option>
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
