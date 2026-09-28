import {
  CameraControls,
  ContactShadows,
  Environment,
  PerspectiveCamera,
  useCursor,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { button, useControls } from "leva";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Computer } from "./models/Computer";
import { Desk } from "./models/Desk";
import { useSceneStore, View } from "./store/sceneStore";

export function Experience() {
  const controls = useRef<CameraControls>(null!);
  const computerRef = useRef<THREE.Group>(null);
  const { view, setView } = useSceneStore();

  const [computerHovered, setComputerHovered] = useState(false);

  useCursor(computerHovered);

  useFrame((_state, delta) => {
    // ref is null while the computer model is still suspended/loading
    if (!computerRef.current) return;
    const targetY = computerHovered && view !== View.Computer ? 0.15 : 0;
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
      // const _position = controls.current.getPosition(posOut);
      // const _target = controls.current.getTarget(targetOut);
      console.log([...posOut, ...targetOut]);
    }),
    topView: button(() => {
      // tiny z offset keeps the azimuth defined so x runs left-to-right on screen
      controls.current.setLookAt(0, 15, 0.001, 0, 0, 0, true);
    }),
  });

  const { bg, envIntensity, keyIntensity } = useControls("lighting", {
    bg: "#455e57",
    envIntensity: { value: 0.46, min: 0, max: 2 },
    keyIntensity: { value: 0.78, min: 0, max: 5 },
  });

  const intro = async () => {
    controls.current.setLookAt(
      11.203981555745555,
      5.735539315121471,
      8.328897788682676,
      1.1873063037610507,
      1.8777275764756218,
      -1.687777463301823,
      false,
    );
  };

  // const lookAtRoom = () => {
  //   controls.current.setLookAt(
  //     13.51801386252385,
  //     4.837672349211554,
  //     13.641891667012825,
  //     -0.21871451447494292,
  //     1.1764189995447016,
  //     -0.09483670998595738,
  //     true,
  //   );
  // };

  const lookAtComputer = () => {
    controls.current.setLookAt(
      5.012523368058709,
      4.228076246544955,
      2.620894640466455,
      4.01363476895033,
      4.1153641565434915,
      -0.6672492491408619,
      true,
    );
  };

  useEffect(() => {
    if (view === View.Intro) intro();
    if (view === View.Computer) lookAtComputer();
    if (view === View.Room) intro();
  }, [view]);

  return (
    <>
      {/* <axesHelper args={[10]} /> */}
      <CameraControls ref={controls} enabled={false} />
      <PerspectiveCamera />
      <color attach="background" args={[bg]} />
      <fog attach="fog" args={[bg, 15, 35]} />

      {/* soft image-based light — own Suspense so the HDR download doesn't block the models */}
      <Suspense>
        <Environment preset="apartment" environmentIntensity={envIntensity} />
      </Suspense>

      {/* sky/ground tint instead of flat ambient */}
      <hemisphereLight args={["#b9c4ff", "#2a1f1a", 0.4]} />

      {/* key light for direction + shadows */}
      <directionalLight
        position={[5, 10, 5]}
        intensity={keyIntensity}
        color="#ffe8d0"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0005}
      />

      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.5}
        scale={20}
        blur={2.5}
        far={10}
      />

      {/* The structural corner environment */}
      <Suspense>
        {/* <Room
          onClick={(e) => {
            e.stopPropagation();
            setView(View.Room);
          }}
        /> */}
        {/* hover lift animates this wrapper so it doesn't fight Computer2's leva position */}
        <group ref={computerRef}>
          <Computer
            castShadow
            onPointerOver={() => setComputerHovered(view !== View.Computer)}
            onPointerOut={() => setComputerHovered(false)}
            onClick={(e) => {
              e.stopPropagation();
              setView(View.Computer);
            }}
            showComputerScreen={view === View.Computer}
          />
        </group>
        <Desk />
      </Suspense>
    </>
  );
}
