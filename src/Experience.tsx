import {
  CameraControls,
  PerspectiveCamera,
  useCursor,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { button, useControls } from "leva";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Computer } from "./models/Computer";
import { Room } from "./models/Room";
import { useSceneStore, View } from "./store/sceneStore";

export function Experience() {
  const controls = useRef<CameraControls>(null!);
  const computerRef = useRef<THREE.Mesh>(null!);
  const { view, setView } = useSceneStore();

  const [computerHovered, setComputerHovered] = useState(false);

  useCursor(computerHovered);

  useFrame((state, delta) => {
    const targetY = computerHovered && view !== View.Computer ? 0.25 : 0;
    // Lerp position along the z-axis
    computerRef.current.position.y = THREE.MathUtils.lerp(
      computerRef.current.position.y,
      targetY,
      delta * 10,
    );
  });

  useControls("helper", {
    getLookAt: button(() => {
      const posOut = new THREE.Vector3();
      const targetOut = new THREE.Vector3();
      const position = controls.current.getPosition(posOut);
      const target = controls.current.getTarget(targetOut);
      console.log([...posOut, ...targetOut]);
    }),
  });

  const intro = async () => {
    controls.current.setLookAt(
      9.020214687579216,
      2.4041598795031955,
      9.020214687579209,
      0,
      0,
      0,
      false,
    );
  };

  const lookAtRoom = () => {
    controls.current.setLookAt(
      9.020214687579216,
      2.4041598795031955,
      9.020214687579209,
      0,
      0,
      0,
      true,
    );
  };

  const lookAtComputer = () => {
    controls.current.setLookAt(
      -1.7164275772957476,
      1.325492570883449,
      1.1825702073447708,
      -2.053116949604439,
      1.3265344483052668,
      1.1822855622665716,
      true,
    );
  };

  useEffect(() => {
    if (view === View.Intro) intro();
    if (view === View.Computer) lookAtComputer();
    if (view === View.Room) lookAtRoom();
  }, [view]);

  return (
    <>
      <axesHelper args={[5]} />
      <CameraControls ref={controls} />
      <PerspectiveCamera />
      {/* Ambient light for general visibility */}
      <ambientLight intensity={1} />

      {/* Directional light positioned to cast shadows into the corner */}
      {/* <directionalLight
        position={[5, 10, 5]}
        intensity={1.5}
        shadow-mapSize={[2048, 2048]}
      /> */}

      {/* The structural corner environment */}
      <Suspense>
        <Room
          onClick={(e) => {
            e.stopPropagation();
            setView(View.Room);
          }}
        />
        <Computer
          ref={computerRef}
          castShadow
          onPointerOver={() => setComputerHovered(view !== View.Computer)}
          onPointerOut={() => setComputerHovered(false)}
          onClick={(e) => {
            e.stopPropagation();
            setView(View.Computer);
          }}
          showComputerScreen={view === View.Computer}
        />
      </Suspense>
    </>
  );
}
