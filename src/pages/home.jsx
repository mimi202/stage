export default function Home() {
  return (
    <>
      <div className=" text-center">
        <h1 style={{ fontFamily: "Arial, sans-serif", margin: "20px" }}>
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
              border: "1px solid black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "10px",
            }}
          >
            Testez vos connaissances sur les pratiques et les concepts
            essentiels pour assurer la sécurité des systèmes informatiques. Que
            vous soyez débutant ou expert, ce quiz vous permettra de mieux
            comprendre les enjeux de la cybersécurité et d'améliorer vos
            compétences pour naviguer de manière plus sécurisée sur Internet.
          </span>
        </div>
        <button className="btn btn-secondary d-block m-3  px-4 py-2 mx-auto">
          Get started
        </button>
      </main>
    </>
  );
}
