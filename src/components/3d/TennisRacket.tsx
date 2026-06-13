"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface TennisRacketProps {
  scrollProgress: number;
}

const SCROLL_POSITIONS = [
  { x: -2.6, y: -0.6, z: -0.3, rotY: 0.45, rotZ: -0.55, rotX: 0.15 },
  { x: -2.1, y: 0.5, z: 0.1, rotY: 0.9, rotZ: -0.35, rotX: 0.05 },
  { x: -1.4, y: 1.3, z: -0.4, rotY: -0.15, rotZ: -0.75, rotX: 0.2 },
  { x: -2.8, y: 0.2, z: 0.4, rotY: 1.15, rotZ: -0.25, rotX: -0.1 },
  { x: -1.8, y: -1.4, z: 0.2, rotY: 0.6, rotZ: -0.5, rotX: 0.25 },
  { x: -2.4, y: 1.0, z: -0.2, rotY: 0.25, rotZ: -0.65, rotX: 0.1 },
];

function getScrollPosition(progress: number) {
  const scaled = progress * (SCROLL_POSITIONS.length - 1);
  const index = Math.floor(scaled);
  const next = Math.min(index + 1, SCROLL_POSITIONS.length - 1);
  const t = scaled - index;
  const current = SCROLL_POSITIONS[index];
  const upcoming = SCROLL_POSITIONS[next];

  return {
    x: THREE.MathUtils.lerp(current.x, upcoming.x, t),
    y: THREE.MathUtils.lerp(current.y, upcoming.y, t),
    z: THREE.MathUtils.lerp(current.z, upcoming.z, t),
    rotY: THREE.MathUtils.lerp(current.rotY, upcoming.rotY, t),
    rotZ: THREE.MathUtils.lerp(current.rotZ, upcoming.rotZ, t),
    rotX: THREE.MathUtils.lerp(current.rotX, upcoming.rotX, t),
  };
}

export function TennisRacket({ scrollProgress }: TennisRacketProps) {
  const groupRef = useRef<THREE.Group>(null);
  const scrollRef = useRef(scrollProgress);

  scrollRef.current = scrollProgress;

  useFrame((state) => {
    if (!groupRef.current) return;

    const t = state.clock.elapsedTime;
    const pos = getScrollPosition(scrollRef.current);

    groupRef.current.position.x = pos.x;
    groupRef.current.position.y = pos.y + Math.sin(t * 0.7) * 0.08;
    groupRef.current.position.z = pos.z;
    groupRef.current.rotation.x = pos.rotX + Math.sin(t * 0.4) * 0.05;
    groupRef.current.rotation.y = pos.rotY;
    groupRef.current.rotation.z = pos.rotZ;
  });

  return (
    <group ref={groupRef} scale={0.95}>
      <mesh position={[0, 0.85, 0]}>
        <torusGeometry args={[0.58, 0.028, 12, 48]} />
        <meshStandardMaterial
          color="#111111"
          metalness={0.45}
          roughness={0.35}
          emissive="#1a1a1a"
          emissiveIntensity={0.1}
        />
      </mesh>

      {Array.from({ length: 12 }).map((_, i) => (
        <mesh
          key={`h-${i}`}
          position={[0, 0.85, 0]}
          rotation={[0, 0, ((i - 5.5) * 0.85) / 6]}
        >
          <boxGeometry args={[1.05, 0.004, 0.004]} />
          <meshStandardMaterial color="#bdbdbd" metalness={0.6} roughness={0.25} />
        </mesh>
      ))}

      {Array.from({ length: 14 }).map((_, i) => (
        <mesh key={`v-${i}`} position={[((i - 6.5) * 0.78) / 7, 0.85, 0]}>
          <boxGeometry args={[0.004, 1.05, 0.004]} />
          <meshStandardMaterial color="#bdbdbd" metalness={0.6} roughness={0.25} />
        </mesh>
      ))}

      <mesh position={[0, 0.28, 0]}>
        <boxGeometry args={[0.09, 0.32, 0.045]} />
        <meshStandardMaterial color="#111111" metalness={0.4} roughness={0.4} />
      </mesh>

      <mesh position={[0, -0.12, 0]}>
        <cylinderGeometry args={[0.042, 0.052, 0.75, 16]} />
        <meshStandardMaterial color="#222222" roughness={0.75} />
      </mesh>

      <mesh position={[0, -0.38, 0]}>
        <cylinderGeometry args={[0.048, 0.048, 0.38, 16]} />
        <meshStandardMaterial color="#C8E632" roughness={0.85} />
      </mesh>
    </group>
  );
}
