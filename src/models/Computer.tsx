import { Html, useCursor, useGLTF } from "@react-three/drei";
import { ThreeElements, useFrame } from "@react-three/fiber";
import { QueryClientProvider } from "@tanstack/react-query";
import { useControls } from "leva";
import { useEffect, useRef, useState } from "react";
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
  };
  materials: {
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
  const screenRef = useRef<THREE.Mesh>(null);
  const { setView } = useSceneStore();
  const [buttonHovered, setButtonHovered] = useState(false);

  useCursor(buttonHovered);

  useEffect(() => {
    nodes.screen.geometry.computeBoundingBox();
    const box = nodes.screen.geometry.boundingBox!;
    const center = new THREE.Vector3();
    const size = new THREE.Vector3();
    box.getCenter(center);
    box.getSize(size);
  }, [nodes]);

  const {
    computerPos,
    positionX,
    positionY,
    positionZ,
    rotationX,
    rotationY,
    rotationZ,
    htmlPosition,
    htmlRotation,
    htmlScale,
  } = useControls("Computer Position", {
    computerPos: { x: 0, y: 0, z: 0 },
    positionX: 0,
    positionY: 0,
    positionZ: 0,
    rotationX: 0.07,
    rotationY: -1.57,
    rotationZ: 0.8,
    htmlPosition: {
      x: 0.491,
      y: 0.598,
      z: -0.008,
    },
    htmlRotation: {
      x: 0,
      y: Math.PI / 2,
      z: 0,
    },
    htmlScale: { value: 0.0655 },
  });

  useFrame((state, delta) => {});

  return (
    <group
      {...props}
      dispose={null}
      position={[computerPos.x, computerPos.y, computerPos.z]}
      // position={[positionX, positionY, positionZ]}
      // rotation={[rotationX, rotationY, rotationZ]}
    >
      <mesh
        name="monitor"
        castShadow
        receiveShadow
        geometry={nodes.monitor.geometry}
        material={materials["Material.001"]}
        scale={0.703}
      />
      <mesh
        name="screen"
        ref={screenRef}
        castShadow
        receiveShadow
        geometry={nodes.screen.geometry}
        material={materials["Material.001"]}
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
            <QueryClientProvider client={queryClient}>
              <Desktop />
            </QueryClientProvider>
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
        scale={0.703}
        onClick={(e) => {
          e.stopPropagation();
          setView(View.Room);
        }}
      />
    </group>
  );
}

useGLTF.preload("/models/computer.glb");
