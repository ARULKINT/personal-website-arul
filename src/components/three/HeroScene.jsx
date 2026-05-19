import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, Text } from '@react-three/drei';

function FloatingShape({ position, color, geo = 'icosahedron', scale = 0.8 }) {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.rotation.x = t * 0.25;
      ref.current.rotation.y = t * 0.18;
    }
  });
  const geometry = useMemo(() => {
    switch (geo) {
      case 'torus':
        return <torusGeometry args={[0.6, 0.18, 24, 64]} />;
      case 'box':
        return <boxGeometry args={[0.9, 0.9, 0.9]} />;
      case 'octa':
        return <octahedronGeometry args={[0.75]} />;
      case 'cone':
        return <coneGeometry args={[0.55, 1.1, 5]} />;
      case 'icosahedron':
      default:
        return <icosahedronGeometry args={[0.78, 0]} />;
    }
  }, [geo]);

  return (
    <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1.4}>
      <mesh ref={ref} position={position} scale={scale}>
        {geometry}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.55}
          metalness={0.6}
          roughness={0.2}
          wireframe={false}
        />
      </mesh>
      <mesh position={position} scale={scale * 1.04}>
        {geometry}
        <meshBasicMaterial color={color} wireframe transparent opacity={0.45} />
      </mesh>
    </Float>
  );
}

function CodeBillboard({ position }) {
  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={1.2}>
      <group position={position}>
        <mesh>
          <planeGeometry args={[1.6, 1]} />
          <meshBasicMaterial color="#0a0f1f" transparent opacity={0.85} />
        </mesh>
        <mesh position={[0, 0, 0.001]}>
          <planeGeometry args={[1.6, 1]} />
          <meshBasicMaterial color="#00f5ff" transparent opacity={0.18} wireframe />
        </mesh>
        <Text
          position={[-0.65, 0.32, 0.01]}
          fontSize={0.08}
          color="#7cf2ff"
          anchorX="left"
          anchorY="top"
        >
          {`> arul.init()\n> render(universe)\n> design + code\n> AI online ✓`}
        </Text>
      </group>
    </Float>
  );
}

function Rig() {
  const target = useRef({ x: 0, y: 0 });
  useFrame((state) => {
    target.current.x = state.mouse.x * 0.6;
    target.current.y = state.mouse.y * 0.4;
    state.camera.position.x += (target.current.x - state.camera.position.x) * 0.04;
    state.camera.position.y += (target.current.y + 0.2 - state.camera.position.y) * 0.04;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.2, 6], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
      style={{ pointerEvents: 'none' }}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[4, 3, 4]} intensity={1.4} color="#00f5ff" />
      <pointLight position={[-4, -2, 2]} intensity={1.2} color="#ff2bd6" />
      <pointLight position={[0, 2, -4]} intensity={0.8} color="#7a5cff" />

      <Stars radius={40} depth={50} count={1500} factor={3} fade speed={0.6} />

      <FloatingShape position={[-3.0, 1.2, -1.5]} color="#00f5ff" geo="icosahedron" />
      <FloatingShape position={[3.1, 1.4, -1.8]} color="#ff2bd6" geo="octa" />
      <FloatingShape position={[-2.6, -1.4, 0.5]} color="#7a5cff" geo="torus" />
      <FloatingShape position={[2.8, -1.6, -0.6]} color="#9dff00" geo="box" scale={0.65} />
      <FloatingShape position={[0, 2.3, -3]} color="#ffb800" geo="cone" scale={0.6} />

      {/* Moved deeper (z=-4) and higher so it renders as a small background
          element and no longer overlaps the left-column hero text */}
      <CodeBillboard position={[-3.8, 1.2, -4.0]} />

      <Rig />
    </Canvas>
  );
}
