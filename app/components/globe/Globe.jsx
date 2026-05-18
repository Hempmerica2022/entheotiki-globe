import { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";

const markers = [
  { lat: 40.7128, lng: -74.006, name: "New York", color: "#00ff88" },
  { lat: 51.5074, lng: -0.1278, name: "London", color: "#00ff88" },
  { lat: 35.6762, lng: 139.6503, name: "Tokyo", color: "#00ff88" },
  { lat: -33.8688, lng: 151.2093, name: "Sydney", color: "#00ff88" },
  { lat: 48.8566, lng: 2.3522, name: "Paris", color: "#00ff88" },
  { lat: 55.7558, lng: 37.6173, name: "Moscow", color: "#00ff88" },
  { lat: 37.7749, lng: -122.4194, name: "San Francisco", color: "#00ff88" },
  { lat: 31.2304, lng: 121.4737, name: "Shanghai", color: "#00ff88" },
];

const arcs = [
  { startLat: 40.7128, startLng: -74.006, endLat: 51.5074, endLng: -0.1278, color: "#00ff88" },
  { startLat: 40.7128, startLng: -74.006, endLat: 35.6762, endLng: 139.6503, color: "#00ff88" },
  { startLat: 51.5074, startLng: -0.1278, endLat: 48.8566, endLng: 2.3522, color: "#00ff88" },
  { startLat: 35.6762, startLng: 139.6503, endLat: -33.8688, endLng: 151.2093, color: "#00ff88" },
  { startLat: 37.7749, startLng: -122.4194, endLat: 31.2304, endLng: 121.4737, color: "#00ff88" },
];

export default function GlobeComponent() {
  const globeRef = useRef();
  const [globeReady, setGlobeReady] = useState(false);

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 0.5;
      globeRef.current.controls().enableZoom = true;
      globeRef.current.pointOfView({ lat: 20, lng: 0, altitude: 2.5 });
    }
  }, [globeReady]);

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#000011", position: "fixed", top: 0, left: 0 }}>
      <Globe
        ref={globeRef}
        onGlobeReady={() => setGlobeReady(true)}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
        pointsData={markers}
        pointColor="color"
        pointAltitude={0.02}
        pointRadius={0.3}
        pointLabel="name"
        arcsData={arcs}
        arcColor="color"
        arcAltitude={0.2}
        arcStroke={0.5}
        arcDashLength={0.5}
        arcDashGap={0.2}
        arcDashAnimateTime={2000}
        atmosphereColor="lightskyblue"
        atmosphereAltitude={0.15}
        showAtmosphere={true}
        showGraticules={false}
      />
    </div>
  );
}
