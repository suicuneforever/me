import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { GLTF } from 'three-stdlib';

type GLTFResult = GLTF & {
  nodes: {
    Cube: THREE.Mesh;
  };
  materials: {
    Material: THREE.MeshStandardMaterial;
  };
};

export function Computa({ props }: any) {
  const { nodes, materials } = useGLTF('computa.glb') as unknown as GLTFResult;
  return (
    <group {...props} dispose={null}>
      <mesh
        // castShadow
        // receiveShadow
        rotation-y={-Math.PI / 2}
        geometry={nodes.Cube.geometry}
        material={materials.Material}
        position={[2, -1, -1.5]}
        scale={1.5}
      />
    </group>
  );
}

useGLTF.preload('computa.glb');
