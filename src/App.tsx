import { Canvas } from '@react-three/fiber';
import { Computa } from './models/Computa';

export default function App() {
  return (
    <>
      hi
      <Canvas>
        <directionalLight position={[10, 10, 5]} intensity={3} />
        <Computa />
      </Canvas>
    </>
  );
}
