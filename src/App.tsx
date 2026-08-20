import { Canvas } from "@react-three/fiber";
import { Link } from "@tanstack/react-router";
import { QueryClientProvider } from "@tanstack/react-query";
import { Experience } from "./Experience";
import { queryClient } from "./queryClient";

export default function App() {
  return (
    <>
      <Link to="/desktop">desktop</Link>
      <div style={{ width: "100vw", height: "100vh", background: "#1a1a1a" }}>
        <Canvas shadows>
          <QueryClientProvider client={queryClient}>
            <Experience />
          </QueryClientProvider>
        </Canvas>
      </div>
    </>
  );
}
