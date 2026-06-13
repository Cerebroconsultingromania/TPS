"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";

interface TennisBallProps {
  scrollProgress: number;
}

const SCROLL_POSITIONS = [
  { x: 2.4, y: 0.8, z: 0.2 },
  { x: 1.8, y: -0.2, z: 0.5 },
  { x: 0.6, y: -1.2, z: -0.2 },
  { x: -1.2, y: 0.4, z: 0.3 },
  { x: -2.2, y: 1.4, z: -0.1 },
  { x: 2.0, y: -1.8, z: 0.4 },
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
  };
}

export function TennisBall({ scrollProgress }: TennisBallProps) {
  const ballRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const scrollRef = useRef(scrollProgress);

  scrollRef.current = scrollProgress;

  useFrame((state) => {
    if (!ballRef.current || !groupRef.current) return;

    const t = state.clock.elapsedTime;
    const pos = getScrollPosition(scrollRef.current);

    groupRef.current.position.x = pos.x;
    groupRef.current.position.y = pos.y + Math.sin(t * 1.2) * 0.12;
    groupRef.current.position.z = pos.z;

    ballRef.current.rotation.x = t * 0.45 + scrollRef.current * Math.PI * 2;
    ballRef.current.rotation.y = t * 0.65 + scrollRef.current * Math.PI;
    ballRef.current.rotation.z = Math.sin(t * 0.8) * 0.15;
  });

  return (
    <group ref={groupRef}>
      <Sphere ref={ballRef} args={[0.42, 48, 48]}>
        <meshStandardMaterial
          color="#C8E632"
          roughness={0.45}
          metalness={0.08}
          emissive="#4a5c00"
          emissiveIntensity={0.15}
        />
      </Sphere>
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <torusGeometry args={[0.42, 0.01, 8, 64, Math.PI]} />
        <meshStandardMaterial color="#f5f5f5" roughness={0.7} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, Math.PI / 4]}>
        <torusGeometry args={[0.42, 0.01, 8, 64, Math.PI]} />
        <meshStandardMaterial color="#f5f5f5" roughness={0.7} />
      </mesh>
      <mesh rotation={[0, Math.PI / 4, Math.PI / 2]}>
        <torusGeometry args={[0.42, 0.008, 8, 64, Math.PI * 0.35]} />
        <meshStandardMaterial color="#ffffff" roughness={0.8} transparent opacity={0.8} />
      </mesh>
    </group>
  );
}
