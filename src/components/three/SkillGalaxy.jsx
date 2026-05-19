import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Billboard, Text } from '@react-three/drei';
import { SKILL_CATEGORIES } from '../../data/skills';
import SkillPlanet from './SkillPlanet';

function CenterStar() {
  const ref = useRef();
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.rotation.y = t * 0.2;
      const s = 1 + Math.sin(t * 1.6) * 0.04;
      ref.current.scale.setScalar(s);
    }
  });
  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[1.05, 32, 32]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
      <mesh scale={1.4}>
        <sphereGeometry args={[1.05, 32, 32]} />
        <meshBasicMaterial color="#7a5cff" transparent opacity={0.4} />
      </mesh>
      <mesh scale={2.0}>
        <sphereGeometry args={[1.05, 32, 32]} />
        <meshBasicMaterial color="#00f5ff" transparent opacity={0.12} />
      </mesh>
      <pointLight intensity={3} color="#ffffff" distance={20} />
      <Billboard>
        <Text fontSize={0.45} color="#05060d" position={[0, 0, 1.06]} anchorX="center" anchorY="middle">
          ARUL
        </Text>
      </Billboard>
    </group>
  );
}

function OrbitRing({ radius, tilt, color }) {
  const segs = 128;
  const positions = new Float32Array((segs + 1) * 3);
  for (let i = 0; i <= segs; i++) {
    const a = (i / segs) * Math.PI * 2;
    positions[i * 3 + 0] = Math.cos(a) * radius;
    positions[i * 3 + 1] = Math.sin(a) * tilt * radius;
    positions[i * 3 + 2] = Math.sin(a) * radius;
  }
  return (
    <line>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={positions.length / 3} itemSize={3} />
      </bufferGeometry>
      <lineBasicMaterial color={color} transparent opacity={0.25} />
    </line>
  );
}

export default function SkillGalaxy({ onSelect }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 4.5, 14], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.25} />
      <Stars radius={50} depth={60} count={1500} factor={3} fade speed={0.5} />

      <CenterStar />

      {SKILL_CATEGORIES.map((cat) => (
        <group key={cat.id}>
          <OrbitRing radius={cat.radius} tilt={cat.tilt} color={cat.color} />
          {cat.skills.map((sk, i) => (
            <SkillPlanet
              key={sk.name}
              skill={sk}
              category={cat}
              radius={cat.radius}
              speed={cat.speed}
              angleOffset={(i / cat.skills.length) * Math.PI * 2}
              tilt={cat.tilt}
              onSelect={onSelect}
            />
          ))}
        </group>
      ))}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.4}
        maxPolarAngle={Math.PI * 0.65}
        minPolarAngle={Math.PI * 0.25}
      />
    </Canvas>
  );
}
