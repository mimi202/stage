import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const user = useSelector((state) => state.quiz.user);
  const navigate = useNavigate();
  const handleNavigate = () => {
    if (user.isAuthentificated) {
      navigate("quiz");
    } else {
      navigate("login");
    }
  };

  return (
    <>
      <div className=" text-center">
        <h1
          style={{
            fontFamily: "Arial, sans-serif",
            margin: "15px",
            color: "#212E53",
          }}
        >
          Welcome to the cyber security Quiz
        </h1>
      </div>
      <main>
        <div className="d-flex  h-25">
          <img
            style={{ padding: "20px" }}
            src="images/R.jpg"
            alt="image"
            className="img-fluid"
            width={600}
            height={600}
          />
          <span
            style={{
              width: "500px",
              height: "400px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px",
              textAlign: "center",

              fontFamily: "serif",
              fontSize: "25px",
            }}
          >
            Testez vos connaissances sur les pratiques et les concepts
            essentiels pour assurer la sécurité des systèmes informatiques. Que
            vous soyez débutant ou expert, ce quiz vous permettra de mieux
            comprendre les enjeux de la cybersécurité et d'améliorer vos
            compétences pour naviguer de manière plus sécurisée sur Internet.
          </span>
        </div>
        <button
          className="btn btn-secondary d-block m-3  px-4 py-2 mx-auto "
          style={{ background: "#212E53" }}
          onClick={handleNavigate}
        >
          Commencer le Quiz
        </button>
      </main>
    </>
  );
}
