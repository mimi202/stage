export default function Header() {
  return (
    <div>
      <div
        style={{
          backgroundColor: "#f7f7f7",
          height: "120px",
          position: "fixed",
          top: "0",
          //   zIndex: "1",

          width: "100%",
          display: "flex",
        }}
      >
        <img
          src="images/logoM.jpg"
          alt="img"
          style={{
            width: "100%",
            height: "120px",
            marginRight: "8px",
            objectFit: "contain",
          }}
        />
      </div>
    </div>
  );
}
