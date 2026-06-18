import * as THREE from 'three';
import { Html, useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import '../App.css';
import Desktop from '../components/Desktop';

type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.Mesh;
    Cube001: THREE.Mesh;
    Cube002: THREE.Mesh;
    Plane: THREE.Mesh;
  };
  materials: {
    Material: THREE.MeshStandardMaterial;
  };
};

export function Computa({ props }: any) {
  const { nodes, materials } = useGLTF('computawithSCREEN.glb') as unknown as GLTFResult;
  const [clicked, setClicked] = useState(false);
  const [showScreen, setShowScreen] = useState(false);
  const screenRef = useRef<THREE.Mesh>();
  // const vec = new THREE.Vector3();

  useFrame((state) => {
    if (clicked) {
      setShowScreen(true);
      state.camera.position.lerp({ x: -0.5, y: 0.75, z: 2.5 }, 0.1);
      // state.camera.lookAt(0, 0, 0);
      // state.camera.updateProjectionMatrix();
    }
  });

  return (
    <group {...props} dispose={null} rotation={[0, -Math.PI / 2, 0]} position={[2.5, -1, -1.5]} scale={1.5}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={materials.Material}
        position={[-1.122, 0, 0.342]}
        scale={1.059}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001.geometry}
        material={materials.Material}
        position={[-0.666, 1.196, 0.754]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube002.geometry}
        material={materials.Material}
        position={[-1.061, 0.378, 4.683]}
      />
      <mesh
        ref={screenRef}
        onClick={() => setClicked(!clicked)}
        castShadow
        receiveShadow
        geometry={nodes.Plane.geometry}
        material={nodes.Plane.material}
        position={[0.296, 1.294, 1.977]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={0.704}
      >
        {showScreen && (
          <Html
            className="content"
            rotation={[-Math.PI / 2, 0, Math.PI / 2]}
            distanceFactor={1.4}
            position={[-0.04, 0, -0.01]}
            transform
          >
            {/* <iframe src="http://localhost:5173/desktop" /> */}
            <Desktop />
          </Html>
        )}
      </mesh>
    </group>
  );
}

useGLTF.preload('computawithSCREEN.glb');
