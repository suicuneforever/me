import { CameraControls, PerspectiveCamera } from "@react-three/drei";
import { button, useControls } from "leva";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";
import { Computer } from "./models/Computer";
import { Room } from "./models/Room";
import { useSceneStore, View } from "./store/sceneStore";

export function Experience() {
  const controls = useRef<CameraControls>(null!);
  const { view, setView } = useSceneStore();

  useControls("helper", {
    getLookAt: button(() => {
      const posOut = new THREE.Vector3();
      const targetOut = new THREE.Vector3();
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
      -1.7173470855196493,
      1.027916556285613,
      1.1809925087285986,
      -2.0540364578283405,
      1.0289584337074307,
      1.1807078636503994,
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
          castShadow
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
