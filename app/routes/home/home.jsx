import { useEffect, useState } from "react";

export default function Home() {
  const [GlobeComponent, setGlobeComponent] = useState(null);

  useEffect(() => {
    import("~/components/globe/Globe").then((mod) => {
      setGlobeComponent(() => mod.default);
    });
  }, []);

  if (!GlobeComponent) {
    return (
      <div style={{ width: "100vw", height: "100vh", background: "#000011" }}>
        <div style={{ color: "#00ff88", display: "flex", alignItems: "center", justifyContent: "center", height: "100%", fontFamily: "sans-serif", fontSize: "1.2rem" }}>
          Loading Globe...
        </div>
      </div>
    );
  }

  return <GlobeComponent />;
}
