import { useSelector } from "react-redux";
//
export default function Home() {
  // const user = useSelector((state) => state.quiz.user);

  return (
    <div className="pt-5 ">
      <div
        className="   px-3  w-100 h-75"
        style={{
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
          fontSize: "26px",
        }}
      >
        <p
          style={{
            width: "500px",
            height: "500px",
            fontFamily: "serif",
          }}
        >
          Testez vos connaissances sur les pratiques et les concepts essentiels
          pour assurer la sécurité des systèmes informatiques. Que vous soyez
          débutant ou expert, ce quiz vous permettra de mieux comprendre les
          enjeux de la cybersécurité et d'améliorer vos compétences pour
          naviguer de manière plus sécurisée sur Internet.
          <br />
          <br />
        </p>

        <div
          style={{
            width: "500px",
            height: "400px",
            display: "flex",
            textAlign: "center",

            fontFamily: "serif",
            fontSize: "26px",
          }}
        >
          <img src="images/R.webp" alt="" />
        </div>
      </div>
    </div>
  );
}
