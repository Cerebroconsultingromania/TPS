"use client";

import { useMemo } from "react";
import * as THREE from "three";

export function createFuzzTexture() {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#C8E632";
  ctx.fillRect(0, 0, size, size);

  for (let i = 0; i < 120000; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const shade = Math.random() * 40 - 20;
    const base = 200 + shade;
    ctx.fillStyle = `rgba(${base}, ${base + 30}, ${base - 80}, 0.35)`;
    ctx.fillRect(x, y, 1.5, 1.5);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  return texture;
}

export function createFuzzBumpMap() {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#808080";
  ctx.fillRect(0, 0, size, size);

  for (let i = 0; i < 80000; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const v = Math.random() > 0.5 ? 220 : 100;
    ctx.fillStyle = `rgb(${v}, ${v}, ${v})`;
    ctx.fillRect(x, y, 1, 1);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

export function useBallMaterials() {
  return useMemo(() => {
    const map = createFuzzTexture();
    const bumpMap = createFuzzBumpMap();

    const ballMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#C8E632"),
      map,
      bumpMap,
      bumpScale: 0.012,
      roughness: 0.92,
      metalness: 0,
      clearcoat: 0.08,
      clearcoatRoughness: 0.85,
      sheen: 0.4,
      sheenRoughness: 0.9,
      sheenColor: new THREE.Color("#E8FF80"),
    });

    const seamMaterial = new THREE.MeshStandardMaterial({
      color: "#FFFFFF",
      roughness: 0.95,
      metalness: 0,
    });

    return { ballMaterial, seamMaterial };
  }, []);
}
