"use client";

import { Suspense, useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment } from "@react-three/drei";
import { TennisBall } from "./TennisBall";
import { TennisRacket } from "./TennisRacket";

function Scene({ scrollProgress }: { scrollProgress: number }) {
  return (
    <>
      <color attach="background" args={["transparent"]} />
      <hemisphereLight
        args={["#DBEAFE", "#FEF3C7", 0.9]}
        position={[0, 20, 0]}
      />
      <directionalLight
        position={[6, 8, 5]}
        intensity={1.6}
        color="#FFFFFF"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-4, 3, 2]} intensity={0.6} color="#BFDBFE" />
      <pointLight position={[3, 2, 4]} intensity={0.5} color="#CCFF00" />
      <pointLight position={[-3, -1, 3]} intensity={0.3} color="#1A56DB" />

      <TennisBall scrollProgress={scrollProgress} />
      <TennisRacket scrollProgress={scrollProgress} />

      <ContactShadows
        position={[0, -2.2, 0]}
        opacity={0.35}
        scale={12}
        blur={2.5}
        far={4}
        color="#1A56DB"
      />

      <Environment preset="park" />
    </>
  );
}

export function ScrollScene() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
      setScrollProgress(Math.min(Math.max(progress, 0), 1));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9]"
      aria-hidden="true"
      style={{
        filter: "drop-shadow(0 20px 40px rgba(26, 86, 219, 0.15))",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 40 }}
        dpr={[1, 2]}
        shadows
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Scene scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
