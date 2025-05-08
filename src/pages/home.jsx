import "../App.css";
export default function Home() {
  return (
    <>
      <div className="pt-5 ">
        <div
          className="   row  px-3  w-100 h-75 "
          style={{
            color: "#fff",
            display: "flex",
            justifyContent: "space-between",
            fontSize: "26px",
          }}
        >
          <p className="col-12 text-dark">
            <b>Bienvenue sur notre plateforme de quiz en cybersécurité !</b>
          </p>
          <p
            className="col-6 fade-in "
            style={{
              width: "500px",
              height: "500px",
              color: "black",
              fontFamily: "Lato",
              // fontSize: "40px",
            }}
          >
            Testez vos connaissances sur les pratiques et les concepts
            essentiels pour assurer la sécurité des systèmes informatiques. Que
            vous soyez débutant ou expert, ce quiz vous permettra de mieux
            comprendre les enjeux de la cybersécurité et d'améliorer vos
            compétences pour naviguer de manière plus sécurisée sur Internet.
            <br />
            <br />
          </p>

          <div
            className="col-6"
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
          <div className="col-12 text-dark" style={{ fontFamily: "Noto Sans" }}>
            <b>La cybersécurité est plus cruciale que jamais !</b> <br />
            Avec l'augmentation des cyberattaques à l'échelle mondiale, il est
            essentiel de se préparer et de comprendre les menaces qui pèsent sur
            nos données personnelles et professionnelles. La plateforme vous
            aide à acquérir les connaissances nécessaires pour naviguer en toute
            sécurité dans le monde numérique et protéger ce qui compte le plus.
          </div>
          <footer
            className="text-white text-center mt-5"
            style={{
              backgroundColor: "#2c3e50",
              height: "300px",
              width: "100vw",
            }}
          >
            <div className="container-fluid py-4">
              <p className="mb-0 fw-bold">
                Plateforme de Quiz en Cybersécurité
              </p>
              <p className="mb-0">
                Ministère de l'Éducation Nationale, Préscolaire et Sport (MENPS)
                - Maroc
              </p>
              <p className="mb-0">
                Un projet pour renforcer les compétences en cybersécurité.
              </p>

              <div className="social-icons mt-3">
                <a
                  href="https://www.facebook.com/MENPSmaroc"
                  className="text-white mx-2"
                >
                  <i className="fab fa-facebook fa-lg"></i>
                </a>
                <a
                  href="https://twitter.com/MENPSmaroc"
                  className="text-white mx-2"
                >
                  <i className="fab fa-twitter fa-lg"></i>
                </a>
                <a
                  href="https://www.linkedin.com/company/menps-maroc"
                  className="text-white mx-2"
                >
                  <i className="fab fa-linkedin fa-lg"></i>
                </a>
              </div>

              <p className="mt-3 mb-0">© 2025 MENPS | Tous droits réservés.</p>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
