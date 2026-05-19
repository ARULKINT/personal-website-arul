import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';

function Cube({ color }) {
  const mesh = useRef();
  const wire = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    [mesh, wire].forEach((r) => {
      if (r.current) {
        r.current.rotation.x = t * 0.5;
        r.current.rotation.y = t * 0.7;
      }
    });
  });
  return (
    <group>
      <mesh ref={mesh}>
        <boxGeometry args={[1.4, 1.4, 1.4]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.55}
          metalness={0.5}
          roughness={0.25}
          transparent
          opacity={0.55}
        />
      </mesh>
      <mesh ref={wire} scale={1.08}>
        <boxGeometry args={[1.4, 1.4, 1.4]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={0.85} />
      </mesh>
    </group>
  );
}

export default function ProjectCube({ color = '#00f5ff', height = 180 }) {
  return (
    <div style={{ height }} className="w-full">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 3.2], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[3, 3, 3]} intensity={1.8} color={color} />
        <pointLight position={[-3, -2, 1]} intensity={1.0} color="#ffffff" />
        <Cube color={color} />
      </Canvas>
    </div>
  );
}
