import { Html, useCursor, useGLTF } from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber";
import { QueryClientProvider } from "@tanstack/react-query";
import { useControls } from "leva";
import { useEffect, useState } from "react";
import * as THREE from "three";
import { GLTF } from "three-stdlib";
import "../../src/App.css";
import Desktop from "../components/os/Desktop";
import { queryClient } from "../queryClient";
import { useSceneStore, View } from "../store/sceneStore";

type GLTFResult = GLTF & {
  nodes: {
    button: THREE.Mesh;
    Cube003: THREE.Mesh;
    Cube003_1: THREE.Mesh;
    Cube003_2: THREE.Mesh;
    screen: THREE.Mesh;
  };
  materials: {
    ["Material.001"]: THREE.MeshStandardMaterial;
    ["Material.004"]: THREE.MeshStandardMaterial;
    ["Material.003"]: THREE.MeshStandardMaterial;
  };
};

type ComputerProps = ThreeElements["group"] & {
  showComputerScreen: boolean;
};

export function Computer({ showComputerScreen, ...props }: ComputerProps) {
  const { nodes, materials } = useGLTF(
    "/models/computer2.glb",
  ) as unknown as GLTFResult;

  const { setView } = useSceneStore();
  const [buttonHovered, setButtonHovered] = useState(false);
  const { compPos, compRotation, htmlPosition, htmlRotation, htmlScale } =
    useControls("Computer", {
      compPos: { x: 3.09, y: 2.82, z: 1.56 },
      compRotation: { x: 0, y: -1.28, z: 0 },
      htmlPosition: {
        x: 0,
        y: 0,
        z: 0,
      },
      htmlRotation: {
        x: 0,
        y: Math.PI / 2,
        z: 0,
      },
      htmlScale: { value: 0.0655 },
    });

  useCursor(buttonHovered);

  useEffect(() => {
    nodes.screen.geometry.computeBoundingBox();
    const box = nodes.screen.geometry.boundingBox!;
    const center = new THREE.Vector3();
    const size = new THREE.Vector3();
    box.getCenter(center);
    box.getSize(size);
  }, [nodes]);

  return (
    <group
      {...props}
      dispose={null}
      position={[compPos.x, compPos.y, compPos.z]}
      rotation={[compRotation.x, compRotation.y, compRotation.z]}
    >
      <mesh
        name="button"
        onPointerOver={() => setButtonHovered(true)}
        onPointerOut={() => setButtonHovered(false)}
        onClick={(e) => {
          e.stopPropagation();
          setView(View.Room);
        }}
        castShadow
        receiveShadow
        geometry={nodes.button.geometry}
        material={materials["Material.001"]}
        position={[0.459, 0.626, -1.892]}
        scale={0.703}
      />
      <group name="computer" position={[0.779, 0.828, 0.769]}>
        <mesh
          name="Cube003"
          castShadow
          receiveShadow
          geometry={nodes.Cube003.geometry}
          material={materials["Material.001"]}
        />
        <mesh
          name="Cube003_1"
          castShadow
          receiveShadow
          geometry={nodes.Cube003_1.geometry}
          material={materials["Material.004"]}
        />
        <mesh
          name="Cube003_2"
          castShadow
          receiveShadow
          geometry={nodes.Cube003_2.geometry}
          material={materials["Material.003"]}
        />
      </group>
      <mesh
        name="screen"
        castShadow
        receiveShadow
        geometry={nodes.screen.geometry}
        material={materials["Material.001"]}
        position={[0.397, 1.372, -1.414]}
        scale={0.703}
      >
        <Html
          transform
          className="content"
          position={[htmlPosition.x, htmlPosition.y, htmlPosition.z]}
          rotation={[htmlRotation.x, htmlRotation.y, htmlRotation.z]}
          scale={htmlScale}
          pointerEvents={showComputerScreen ? "auto" : "none"}
          style={{
            visibility: showComputerScreen ? "visible" : "hidden",
          }}
        >
          <div className="wrapper">
            {showComputerScreen && (
              <QueryClientProvider client={queryClient}>
                <Desktop />
              </QueryClientProvider>
            )}
          </div>
        </Html>
      </mesh>
    </group>
  );
}

useGLTF.preload("/models/computer2.glb");
