// import { Canvas } from '@react-three/fiber';
// import { Computa } from './models/Computa';
// import { Suspense } from 'react';
// import { Link } from '@tanstack/react-router';

import Desktop from "./components/os/Desktop/Desktop";

export default function App() {
  return (
    <>
      <Desktop />
      {/* <Link to="/desktop">desktop</Link>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        {/* <OrbitControls /> */}
      {/* <directionalLight position={[10, 10, 5]} intensity={3} /> */}
      {/* look into */}
      {/* <Suspense>
          <Computa />
        </Suspense>
      </Canvas> */}
    </>
  );
}
