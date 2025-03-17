import { useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { updateUser } from "../redux/MySlice";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.quiz.user);

  const nomRef = useRef();
  const prenomRef = useRef();
  const [genre, setGenre] = useState("");
  const emailRef = useRef();
  const handleLogin = (e) => {
    e.preventDefault();
    const newUser = {
      nom: nomRef.current.value,
      prénom: prenomRef.current.value,
      genre: genre,
      email: emailRef.current.value,
    };

    dispatch(updateUser(newUser));
  };
  const handleNavigate = () => {
    if (user.isAuthentificated) {
      navigate("/commencerQuiz");
    }
  };
  return (
    <form action="" className="form w-50 mx-auto">
      <div className="form-group">
        <label className="form-label ">Nom :</label>
        <input
          id="nom"
          type="text"
          name="nom"
          className="form-control my-2 "
          ref={nomRef}
        />
      </div>
      <div>
        <label className="form-label ">Prénom:</label>
        <input
          type="text"
          name="prénom"
          className="form-control  my-2"
          ref={prenomRef}
        />
      </div>
      <div className="form-group">
        <label className="form-label ">E-mail :</label>
        <input
          id="email"
          type="email"
          name="email"
          className="form-control my-2 "
          ref={emailRef}
        />
      </div>
      <div className="form-group  ">
        <label className=" form-check-label ">
          <input
            type="radio"
            name="genre"
            value="Femme"
            className="form-check-input  mx-2 my-2"
            onChange={(e) => setGenre(e.target.value)}
          />
          Femme
        </label>
        <label className=" form-check-label ">
          <input
            type="radio"
            name="genre"
            value="Homme"
            className="form-check-input   mx-2 my-2"
            onChange={(e) => setGenre(e.target.value)}
          />
          Homme
        </label>
      </div>
      <div>
        <button
          onClick={(e) => {
            handleLogin(e);
            handleNavigate();
          }}
          className="btn btn-success  d-block mx-auto px-4 my-4"
        >
          Connexion
        </button>
      </div>
    </form>
  );
}

export default Login;
