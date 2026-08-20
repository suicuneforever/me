import { CameraControls, PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { button, useControls } from "leva";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Computer } from "./models/Computer";
import { Room } from "./models/Room";

function CameraRig({ x, y, z }: { x: number; y: number; z: number }) {
  useFrame((state) => {
    state.camera.position.lerp({ x, y, z }, 1);
    state.camera.updateProjectionMatrix();
  });

  return null;
}

// TODO explain
const CAMERA_POSITIONS = {
  intro: [0, 0, 3, 0, 0, 0],
  computer: [1.37, 0.54, 0.006, 0, 0, 0],
  room: [9.020214687579216, 2.4041598795031955, 9.020214687579209, 0, 0, 0],
} as const;

export function Experience() {
  const controls = useRef<CameraControls>(null!);
  const [showComputerScreen, setShowComputerScreen] = useState(false);

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

  const lookAtComputer = () => {
    // controls.current.setLookAt(1.4139162087389177, 0.40600224768936544, 0.005726569169989911, 0, 0, 0, true);
    controls.current.setLookAt(
      1.4139162087389177,
      0.40600224768936544,
      0.005726569169989911,
      -0.01347061327284473,
      0.34974028536189455,
      -0.0005247599775067819,
      true,
    );

    // animation
    setShowComputerScreen(true);
    console.log(showComputerScreen);

    // controls.current.truck(0, -0.35, true);
  };

  useEffect(() => {
    intro();
  }, []);

  return (
    <>
      <axesHelper args={[5]} />
      <CameraControls ref={controls} />
      <PerspectiveCamera />
      {/* Ambient light for general visibility */}
      <ambientLight intensity={0.6} />

      {/* Directional light positioned to cast shadows into the corner */}
      <directionalLight
        position={[5, 10, 5]}
        intensity={1.5}
        shadow-mapSize={[2048, 2048]}
      />

      {/* The structural corner environment */}
      <Suspense>
        <Room />
        <Computer
          castShadow
          onClick={() => lookAtComputer()}
          showComputerScreen={showComputerScreen}
        />
      </Suspense>

      {/* Enables mouse rotation, panning, and zooming */}
      {/* <OrbitControls
            enablePan={false}
            maxPolarAngle={Math.PI / 2 - 0.05} // Limits camera from going below floor
            minDistance={3}
            maxDistance={20}
          /> */}
    </>
  );
}
