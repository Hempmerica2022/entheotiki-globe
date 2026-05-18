import { useEffect, useState } from "react";

const Home = () => {
  const [Main, setMain] = useState(null);

  useEffect(() => {
    import("~/components/globe/main").then((mod) => {
      setMain(() => mod.default);
    });
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: "#000",
      }}
    >
      {!Main && (
        <div
          style={{
            color: "white",
            padding: "2rem",
            fontFamily: "sans-serif",
          }}
        >
          Loading Entheotiki Globe...
        </div>
      )}

      {Main && <Main />}
    </div>
  );
};

export default Home;
