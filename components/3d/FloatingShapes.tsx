'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three';
import { MeshDistortMaterial } from '@react-three/drei';

export default function FloatingShapes() {
  const sphere1Ref = useRef<Mesh>(null);
  const sphere2Ref = useRef<Mesh>(null);
  const cubeRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (sphere1Ref.current) {
      sphere1Ref.current.rotation.x += 0.01;
      sphere1Ref.current.rotation.y += 0.01;
      sphere1Ref.current.position.y = Math.sin(state.clock.elapsedTime) * 0.5;
    }
    if (sphere2Ref.current) {
      sphere2Ref.current.rotation.x -= 0.01;
      sphere2Ref.current.rotation.y -= 0.01;
      sphere2Ref.current.position.y = Math.cos(state.clock.elapsedTime) * 0.5;
    }
    if (cubeRef.current) {
      cubeRef.current.rotation.x += 0.005;
      cubeRef.current.rotation.y += 0.005;
      cubeRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.7) * 0.3;
    }
  });

  return (
    <>
      {/* Distorted Sphere 1 */}
      <mesh ref={sphere1Ref} position={[-3, 0, 0]}>
        <sphereGeometry args={[1, 100, 200]} />
        <MeshDistortMaterial
          color="#6B4CE6"
          distort={0.5}
          speed={2}
          roughness={0}
          metalness={0.8}
        />
      </mesh>

      {/* Distorted Sphere 2 */}
      <mesh ref={sphere2Ref} position={[3, 0, 0]}>
        <sphereGeometry args={[0.8, 100, 200]} />
        <MeshDistortMaterial
          color="#0066FF"
          distort={0.4}
          speed={1.5}
          roughness={0}
          metalness={0.8}
        />
      </mesh>

      {/* Floating Cube */}
      <mesh ref={cubeRef} position={[0, -1, -2]}>
        <boxGeometry args={[1, 1, 1]} />
        <MeshDistortMaterial
          color="#00D4AA"
          distort={0.3}
          speed={1}
          roughness={0}
          metalness={0.7}
        />
      </mesh>
    </>
  );
}
