"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere } from "@react-three/drei";
import * as THREE from "three";
import { useBallMaterials } from "./materials";

interface TennisBallProps {
  scrollProgress: number;
}

const SCROLL_POSITIONS = [
  { x: 2.2, y: 0.6, z: 0.3 },
  { x: 1.6, y: -0.3, z: 0.6 },
  { x: 0.4, y: -1.0, z: 0.1 },
  { x: -0.8, y: 0.5, z: 0.4 },
  { x: -1.8, y: 1.2, z: 0.2 },
  { x: 1.8, y: -1.4, z: 0.5 },
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
  const { ballMaterial, seamMaterial } = useBallMaterials();

  scrollRef.current = scrollProgress;

  useFrame((state) => {
    if (!ballRef.current || !groupRef.current) return;

    const t = state.clock.elapsedTime;
    const pos = getScrollPosition(scrollRef.current);

    groupRef.current.position.x = pos.x;
    groupRef.current.position.y = pos.y + Math.sin(t * 1.2) * 0.1;
    groupRef.current.position.z = pos.z;

    ballRef.current.rotation.x = t * 0.4 + scrollRef.current * Math.PI * 2;
    ballRef.current.rotation.y = t * 0.55 + scrollRef.current * Math.PI;
  });

  return (
    <group ref={groupRef} scale={1.15}>
      <Sphere ref={ballRef} args={[0.48, 64, 64]} material={ballMaterial} />
      <mesh rotation={[0, 0, Math.PI / 4]} material={seamMaterial}>
        <torusGeometry args={[0.48, 0.012, 12, 80, Math.PI]} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, Math.PI / 4]} material={seamMaterial}>
        <torusGeometry args={[0.48, 0.012, 12, 80, Math.PI]} />
      </mesh>
    </group>
  );
}
