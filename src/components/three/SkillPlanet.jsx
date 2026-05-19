import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Billboard, Text } from '@react-three/drei';

export default function SkillPlanet({
  skill,
  category,
  radius,
  speed,
  angleOffset,
  tilt,
  onSelect,
}) {
  const groupRef = useRef();
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const angle = t * speed + angleOffset;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    const y = Math.sin(angle * 1.3) * tilt * radius;
    if (groupRef.current) {
      groupRef.current.position.set(x, y, z);
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.7;
      meshRef.current.rotation.x = t * 0.4;
    }
  });

  const size = hovered ? 0.42 : 0.32;

  return (
    <group ref={groupRef}>
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = '';
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect({ ...skill, category });
        }}
      >
        <icosahedronGeometry args={[size, 1]} />
        <meshStandardMaterial
          color={category.color}
          emissive={category.color}
          emissiveIntensity={hovered ? 1.3 : 0.7}
          metalness={0.4}
          roughness={0.25}
        />
      </mesh>
      <mesh scale={hovered ? 1.35 : 1.18}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshBasicMaterial color={category.color} transparent opacity={hovered ? 0.18 : 0.1} />
      </mesh>

      <Billboard>
        <Text
          position={[0, size + 0.42, 0]}
          fontSize={hovered ? 0.22 : 0.18}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          outlineColor="#05060d"
          outlineWidth={0.015}
        >
          {skill.name}
        </Text>
      </Billboard>
    </group>
  );
}
