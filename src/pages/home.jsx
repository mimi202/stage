import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const user = useSelector((state) => state.quiz.user);
  const navigate = useNavigate();
  const handleNavigate = () => {
    if (user.isAuthentificated) {
      navigate("commencerQuiz");
    } else {
      navigate("login");
    }
  };

  return (
    <div className="pt-5">
      <main>
        <div
          className="   px-3  w-100 h-75"
          style={{
            color: "#fff",
            display: "flex",
            justifyContent: "space-between",
            fontSize: "26px",
          }}
        >
          <p style={{ width: "500px", height: "700px" }}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis
            voluptatum nesciunt iure provident porro corporis, ratione officia
            veniam debitis unde?
            <br />
            <br />
          </p>

          <p
            style={{
              width: "500px",
              height: "400px",
              display: "flex",
              textAlign: "center",

              fontFamily: "serif",
              fontSize: "26px",
            }}
          >
            Testez vos connaissances sur les pratiques et les concepts
            essentiels pour assurer la sécurité des systèmes informatiques. Que
            vous soyez débutant ou expert, ce quiz vous permettra de mieux
            comprendre les enjeux de la cybersécurité et d'améliorer vos
            compétences pour naviguer de manière plus sécurisée sur Internet.
          </p>
        </div>
        <button
          className="btn btn-secondary d-block mb-3  px-4 py-2 mx-auto text-dark "
          style={{ background: "#F4F0E3" }}
          onClick={handleNavigate}
        >
          Commencer le Quiz
        </button>
      </main>
    </div>
  );
}
