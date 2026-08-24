"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface TennisRacketProps {
  scrollProgress: number;
}

const SCROLL_POSITIONS = [
  { x: -2.4, y: -0.5, z: 0.2, rotY: 0.5, rotZ: -0.5, rotX: 0.1 },
  { x: -1.9, y: 0.6, z: 0.4, rotY: 0.85, rotZ: -0.3, rotX: 0.05 },
  { x: -1.2, y: 1.2, z: 0.1, rotY: -0.1, rotZ: -0.7, rotX: 0.15 },
  { x: -2.5, y: 0.3, z: 0.5, rotY: 1.1, rotZ: -0.2, rotX: -0.05 },
  { x: -1.6, y: -1.2, z: 0.3, rotY: 0.55, rotZ: -0.45, rotX: 0.2 },
  { x: -2.1, y: 0.9, z: 0.15, rotY: 0.3, rotZ: -0.6, rotX: 0.08 },
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

const frameMaterial = new THREE.MeshPhysicalMaterial({
  color: "#111111",
  metalness: 0.35,
  roughness: 0.28,
  clearcoat: 0.6,
  clearcoatRoughness: 0.2,
});

const accentMaterial = new THREE.MeshStandardMaterial({
  color: "#CCFF00",
  metalness: 0.2,
  roughness: 0.45,
  emissive: "#4D6600",
  emissiveIntensity: 0.08,
});

const stringMaterial = new THREE.MeshStandardMaterial({
  color: "#E8E8E8",
  metalness: 0.75,
  roughness: 0.15,
});

const gripMaterial = new THREE.MeshStandardMaterial({
  color: "#CCFF00",
  roughness: 0.88,
  metalness: 0,
});

export function TennisRacket({ scrollProgress }: TennisRacketProps) {
  const groupRef = useRef<THREE.Group>(null);
  const scrollRef = useRef(scrollProgress);

  scrollRef.current = scrollProgress;

  useFrame((state) => {
    if (!groupRef.current) return;

    const t = state.clock.elapsedTime;
    const pos = getScrollPosition(scrollRef.current);

    groupRef.current.position.x = pos.x;
    groupRef.current.position.y = pos.y + Math.sin(t * 0.7) * 0.06;
    groupRef.current.position.z = pos.z;
    groupRef.current.rotation.x = pos.rotX + Math.sin(t * 0.4) * 0.04;
    groupRef.current.rotation.y = pos.rotY;
    groupRef.current.rotation.z = pos.rotZ;
  });

  return (
    <group ref={groupRef} scale={1.05}>
      {/* Elliptical frame */}
      <mesh position={[0, 0.9, 0]} scale={[0.82, 1, 1]} material={frameMaterial}>
        <torusGeometry args={[0.62, 0.032, 16, 64]} />
      </mesh>

      {/* Inner yellow accent rim */}
      <mesh position={[0, 0.9, 0.01]} scale={[0.78, 0.96, 1]} material={accentMaterial}>
        <torusGeometry args={[0.58, 0.014, 12, 64]} />
      </mesh>

      {/* Strings */}
      {Array.from({ length: 14 }).map((_, i) => (
        <mesh
          key={`h-${i}`}
          position={[0, 0.9, 0.005]}
          rotation={[0, 0, ((i - 6.5) * 0.82) / 7]}
          material={stringMaterial}
        >
          <boxGeometry args={[1.15, 0.003, 0.003]} />
        </mesh>
      ))}

      {Array.from({ length: 16 }).map((_, i) => (
        <mesh
          key={`v-${i}`}
          position={[((i - 7.5) * 0.82) / 8, 0.9, 0.005]}
          material={stringMaterial}
        >
          <boxGeometry args={[0.003, 1.12, 0.003]} />
        </mesh>
      ))}

      {/* Throat */}
      <mesh position={[0, 0.32, 0]} material={frameMaterial}>
        <boxGeometry args={[0.1, 0.34, 0.05]} />
      </mesh>

      {/* Handle */}
      <mesh position={[0, -0.1, 0]} material={frameMaterial}>
        <cylinderGeometry args={[0.045, 0.055, 0.78, 20]} />
      </mesh>

      {/* Grip */}
      <mesh position={[0, -0.36, 0]} material={gripMaterial}>
        <cylinderGeometry args={[0.05, 0.05, 0.42, 20]} />
      </mesh>
    </group>
  );
}
