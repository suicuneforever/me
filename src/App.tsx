import { Canvas } from '@react-three/fiber';
import { useLoader } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Suspense } from 'react';
import { Computa } from './models/Computa';

const Model = () => {
  const gltf = useLoader(GLTFLoader, 'src/assets/computa2.glb');
  return (
    <>
      <primitive object={gltf.scene} scale={1} />
    </>
  );
};

export default function App() {
  return (
    <>
      <Canvas>
        <directionalLight position={[10, 10, 5]} intensity={3} />
        <Computa />
      </Canvas>
    </>
  );
}
