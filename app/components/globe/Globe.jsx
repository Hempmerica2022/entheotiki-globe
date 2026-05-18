import { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";

export default function GlobeComponent() {
  const globeRef = useRef();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.3;
      globeRef.current.pointOfView({ lat: 0, lng: 0, altitude: 2.5 });
    }
  }, [ready]);

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#000011", position: "fixed", top: 0, left: 0 }}>
      <Globe
        ref={globeRef}
        onGlobeReady={() => setReady(true)}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        atmosphereColor="lightskyblue"
        atmosphereAltitude={0.15}
        showAtmosphere={true}
        showGraticules={false}
      />
    </div>
  );
}
