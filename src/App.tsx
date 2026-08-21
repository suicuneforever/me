import { Canvas } from "@react-three/fiber";
import { QueryClientProvider } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Experience } from "./Experience";
import { queryClient } from "./queryClient";
import { useSceneStore, View } from "./store/sceneStore";

export default function App() {
  const { setView } = useSceneStore();
  return (
    <>
      <Link to="/desktop">desktop</Link>
      <div style={{ width: "100vw", height: "100vh", background: "#1a1a1a" }}>
        <Canvas shadows onPointerMissed={() => setView(View.Room)}>
          <QueryClientProvider client={queryClient}>
            <Experience />
          </QueryClientProvider>
        </Canvas>
      </div>
    </>
  );
}

// stop propegation on all
