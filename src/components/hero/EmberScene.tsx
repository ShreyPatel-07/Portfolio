"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Hero sculpture: a machined ember core inside three orbiting rings.
 * Deliberately restrained — flat-shaded geometry, warm key light, mouse
 * parallax. No post-processing, no textures, no downloaded assets.
 *
 * Falls back to a CSS composition for touch/small screens and for visitors who
 * ask for reduced motion, so the hero never depends on WebGL.
 */
/** Cheap one-off capability probe — no WebGL context is kept alive. */
function supportsWebgl() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2") ??
        canvas.getContext("webgl") ??
        canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
}

export function EmberScene() {
  const [mode, setMode] = useState<"pending" | "webgl" | "css">("pending");
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const smallQuery = window.matchMedia("(max-width: 767px)");

    const decide = () => {
      setMode(
        reducedQuery.matches || smallQuery.matches || !supportsWebgl() ? "css" : "webgl"
      );
    };

    decide();
    reducedQuery.addEventListener("change", decide);
    smallQuery.addEventListener("change", decide);
    return () => {
      reducedQuery.removeEventListener("change", decide);
      smallQuery.removeEventListener("change", decide);
    };
  }, []);

  useEffect(() => {
    if (mode !== "webgl") return;
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mode]);

  if (mode !== "webgl") return <CssOrb />;

  return (
    <Canvas
      dpr={[1, 1.7]}
      camera={{ position: [0, 0, 5.4], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 6, 4]} intensity={2.4} color="#fff1e2" />
      <pointLight position={[-4, -2, 3]} intensity={14} color="#f4551d" distance={14} />
      <Sculpture pointer={pointer} />
    </Canvas>
  );
}

function Sculpture({ pointer }: { pointer: React.RefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const ringC = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    const group3d = group.current;
    if (!group3d) return;
    const target = pointer.current ?? { x: 0, y: 0 };

    group3d.rotation.y += delta * 0.16;
    // Scroll adds a slow parallax spin without hijacking the pointer response.
    group3d.rotation.z = THREE.MathUtils.lerp(
      group3d.rotation.z,
      window.scrollY * 0.00045,
      0.04
    );
    group3d.rotation.x = THREE.MathUtils.lerp(group3d.rotation.x, target.y * 0.22, 0.045);
    group3d.position.x = THREE.MathUtils.lerp(group3d.position.x, target.x * 0.34, 0.05);
    group3d.position.y = THREE.MathUtils.lerp(group3d.position.y, -target.y * 0.16, 0.05);

    if (ringA.current) ringA.current.rotation.z += delta * 0.12;
    if (ringB.current) ringB.current.rotation.y += delta * 0.2;
    if (ringC.current) ringC.current.rotation.x += delta * 0.09;
  });

  return (
    <group ref={group} rotation={[0.2, 0, 0.1]}>
      {/* Machined core */}
      <mesh>
        <icosahedronGeometry args={[1.02, 1]} />
        <meshStandardMaterial
          color="#f4551d"
          emissive="#6d1f06"
          emissiveIntensity={0.6}
          roughness={0.34}
          metalness={0.45}
          flatShading
        />
      </mesh>

      {/* Wireframe shell */}
      <mesh scale={1.32}>
        <icosahedronGeometry args={[1.02, 1]} />
        <meshBasicMaterial color="#f4eee3" wireframe transparent opacity={0.16} />
      </mesh>

      {/* Outer shell — a second, larger cage gives the core real depth */}
      <mesh scale={1.78} rotation={[0.4, 0.2, 0]}>
        <icosahedronGeometry args={[1.02, 0]} />
        <meshBasicMaterial color="#ffb27a" wireframe transparent opacity={0.07} />
      </mesh>

      {/* Orbit rings — thin turned-metal bands */}
      <mesh ref={ringA} rotation={[Math.PI / 2.6, 0.35, 0]}>
        <torusGeometry args={[1.62, 0.005, 6, 220]} />
        <meshStandardMaterial color="#f4eee3" metalness={0.9} roughness={0.28} />
      </mesh>
      <mesh ref={ringB} rotation={[Math.PI / 1.9, 0, 0.6]}>
        <torusGeometry args={[1.94, 0.004, 6, 220]} />
        <meshStandardMaterial color="#ffb27a" metalness={0.8} roughness={0.35} transparent opacity={0.75} />
      </mesh>
      <mesh ref={ringC} rotation={[0.4, Math.PI / 2.4, 0]}>
        <torusGeometry args={[2.3, 0.003, 6, 220]} />
        <meshStandardMaterial color="#bf421b" metalness={0.7} roughness={0.4} transparent opacity={0.55} />
      </mesh>

      {/* Depth field — small markers receding behind the sculpture, so the
          composition reads as a volume from any pointer position. */}
      {Array.from({ length: 30 }).map((_, index) => {
        const angle = (index / 30) * Math.PI * 2;
        const radius = 2.45 + (index % 5) * 0.38;
        const depth = -1.2 - (index % 7) * 0.32;
        return (
          <mesh
            key={`depth-${index}`}
            position={[Math.cos(angle) * radius, Math.sin(angle) * radius * 0.72, depth]}
          >
            <sphereGeometry args={[0.012 + (index % 3) * 0.004, 6, 6]} />
            <meshBasicMaterial color="#ffb27a" transparent opacity={0.42} />
          </mesh>
        );
      })}

      {/* Orbiting index dots — the "inspection" marks */}
      {Array.from({ length: 8 }).map((_, index) => {
        const angle = (index / 8) * Math.PI * 2;
        return (
          <mesh
            key={index}
            position={[Math.cos(angle) * 1.62, Math.sin(angle) * 1.62, 0]}
            rotation={[Math.PI / 2.6, 0.35, 0]}
          >
            <sphereGeometry args={[0.018, 8, 8]} />
            <meshBasicMaterial color="#f4eee3" />
          </mesh>
        );
      })}
    </group>
  );
}

/** Static, asset-free fallback used on mobile and with reduced motion. */
function CssOrb() {
  return (
    <div aria-hidden className="relative flex h-full w-full items-center justify-center">
      <div className="relative aspect-square w-[min(84%,340px)]">
        <div className="absolute inset-[4%] rounded-full border border-cream/10" />
        <div className="absolute inset-[17%] rounded-full border border-cream/15" />
        <div className="absolute inset-[30%] rounded-full border border-amber/25" />
        <div className="absolute inset-[36%] rounded-full bg-[radial-gradient(circle_at_35%_30%,#ffb27a,#f4551d_45%,#8f2f10_100%)] shadow-[0_0_120px_40px_rgba(244,85,29,0.25)]" />
        <span className="absolute left-1/2 top-[1%] h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-cream/80" />
        <span className="absolute bottom-[8%] right-[12%] h-1 w-1 rounded-full bg-cream/50" />
      </div>
    </div>
  );
}
