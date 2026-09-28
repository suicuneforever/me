import { useGLTF } from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber";
import { useControls } from "leva";
import * as THREE from "three";
import { GLTF } from "three-stdlib";

type GLTFResult = GLTF & {
  nodes: {
    desk: THREE.Mesh;
  };
  materials: {
    ["Untitled_Artwork(5)"]: THREE.MeshStandardMaterial;
  };
};

type DeskProps = ThreeElements["group"] & {};

// TOOO DESK SHADING NEEDS TO BE FLIPPED

export function Desk({ ...props }: DeskProps) {
  const { nodes, materials } = useGLTF(
    "/models/desk.glb",
  ) as unknown as GLTFResult;

  const { deskPos, deskRotation } = useControls("Desk Position", {
    deskPos: { x: 4, y: 1.2, z: 3.34 },
    deskRotation: { x: Math.PI, y: 0.55, z: Math.PI / 2 },
  });

  return (
    <group {...props} dispose={null}>
      <mesh
        name="desk"
        castShadow
        receiveShadow
        geometry={nodes.desk.geometry}
        material={materials["Untitled_Artwork(5)"]}
        position={[deskPos.x, deskPos.y, deskPos.z]}
        rotation={[deskRotation.x, deskRotation.y, deskRotation.z]}
        scale={17.408}
      />
    </group>
  );
}

useGLTF.preload("/models/desk.glb");
