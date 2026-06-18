import { Canvas } from '@react-three/fiber';
import { Computa } from './models/Computa';
import { Suspense } from 'react';

export default function App() {
  return (
    <>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        {/* <OrbitControls /> */}
        <directionalLight position={[10, 10, 5]} intensity={3} />
        {/* look into */}
        <Suspense>
          <Computa />
        </Suspense>
      </Canvas>
    </>
  );
}
