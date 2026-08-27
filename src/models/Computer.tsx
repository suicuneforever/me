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
    monitor: THREE.Mesh;
    screen: THREE.Mesh;
    button: THREE.Mesh;
    computer: THREE.Mesh;
    keyboard: THREE.Mesh;
    mousepad: THREE.Mesh;
    cords: THREE.Mesh;
    mouse: THREE.Mesh;
  };
  materials: {
    ["Material.001"]: THREE.MeshStandardMaterial;
    ["Material.004"]: THREE.MeshStandardMaterial;
    ["Material.003"]: THREE.MeshStandardMaterial;
    ["Material.001"]: THREE.MeshStandardMaterial;
  };
};

type ComputerProps = ThreeElements["group"] & {
  showComputerScreen: boolean;
};

export function Computer({ showComputerScreen, ...props }: ComputerProps) {
  const { nodes, materials } = useGLTF(
    "/models/computer.glb",
  ) as unknown as GLTFResult;
  const { setView } = useSceneStore();
  const [buttonHovered, setButtonHovered] = useState(false);
  const { computerPos, htmlPosition, htmlRotation, htmlScale } = useControls(
    "Computer Position",
    {
      computerPos: { x: -3.24, y: -0.26, z: 1.24 },
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
    },
  );

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
      position={[computerPos.x, computerPos.y, computerPos.z]}
    >
      <mesh
        name="monitor"
        castShadow
        receiveShadow
        geometry={nodes.monitor.geometry}
        material={materials["Material.001"]}
        position={[-0.065, 1.063, -0.01]}
        scale={0.703}
      />
      <mesh
        name="screen"
        castShadow
        receiveShadow
        geometry={nodes.screen.geometry}
        material={materials["Material.001"]}
        position={[0.397, 1.372, -0.009]}
        scale={0.703}
      >
        <Html
          transform
          // occlude
          className="content"
          position={[htmlPosition.x, htmlPosition.y, htmlPosition.z]}
          rotation={[htmlRotation.x, htmlRotation.y, htmlRotation.z]}
          scale={htmlScale}
          style={{
            visibility: showComputerScreen ? "visible" : "hidden",
            pointerEvents: showComputerScreen ? "auto" : "none",
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
      <mesh
        name="button"
        onPointerOver={() => setButtonHovered(true)}
        onPointerOut={() => setButtonHovered(false)}
        castShadow
        receiveShadow
        geometry={nodes.button.geometry}
        material={materials["Material.001"]}
        position={[0.459, 0.626, -0.487]}
        scale={0.703}
        onClick={(e) => {
          e.stopPropagation();
          setView(View.Room);
        }}
      />
      <mesh
        name="computer"
        castShadow
        receiveShadow
        geometry={nodes.computer.geometry}
        material={materials["Material.001"]}
        position={[0.193, 0.828, -2.022]}
      />
      <mesh
        name="keyboard"
        castShadow
        receiveShadow
        geometry={nodes.keyboard.geometry}
        material={materials["Material.004"]}
        position={[1.295, 0.221, 0.008]}
        rotation={[0, Math.PI / 2, 0]}
      />
      <mesh
        name="mousepad"
        castShadow
        receiveShadow
        geometry={nodes.mousepad.geometry}
        material={materials["Material.003"]}
        position={[1.379, 0.146, -1.977]}
        rotation={[Math.PI / 2, 0, -Math.PI / 2]}
        scale={13.326}
      />
      <mesh
        name="cords"
        castShadow
        receiveShadow
        geometry={nodes.cords.geometry}
        material={materials["Material.001"]}
        position={[0.249, 0.147, -0.937]}
        scale={-0.141}
      />
      <mesh
        name="mouse"
        castShadow
        receiveShadow
        geometry={nodes.mouse.geometry}
        material={materials["Material.003"]}
        position={[1.464, 0.228, -1.794]}
        rotation={[0, 0, -Math.PI]}
        scale={-0.168}
      />
    </group>
  );
}

useGLTF.preload("/models/computer.glb");
