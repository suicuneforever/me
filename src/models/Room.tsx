// Component representing the room corner boundaries
export function Room() {
  return (
    <group position={[0, -2, 0]}>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#e0e0e0" roughness={0.8} />
      </mesh>

      {/* Left Wall */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-5, 5, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#b0bec5" roughness={0.6} />
      </mesh>

      {/* Back Wall */}
      <mesh rotation={[0, 0, 0]} position={[0, 5, -5]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#cfd8dc" roughness={0.6} />
      </mesh>
    </group>
  );
}
