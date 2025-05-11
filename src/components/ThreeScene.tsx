'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Text } from '@react-three/drei';
import { Suspense, useRef } from 'react';
import { Object3D } from 'three';

function RotatingRose() {
  const gltf = useGLTF('/models/rose.glb');
  const ref = useRef<Object3D>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.8;
  });
  return (
    <primitive
      ref={ref}
      object={gltf.scene}
      position={[0, -0.5, 3]} // lower the rose on the Y-axis
    />
  );
}

function ResponsiveText() {
  const { size } = useThree();
  const isMobile = size.width < 600; // threshold in pixels
  return (
    <Text
      position={isMobile ? [0, 1.8, 3] : [0, 2, 3]}
      maxWidth={isMobile ? 1 : 5} // narrow wrap on mobile
      fontSize={isMobile ? 0.2 : 0.4}
      textAlign='center'
      color='black'
      anchorX='center'
      anchorY='middle'
    >
      Happy Mother&apos;s Day
    </Text>
  );
}

export default function ThreeScene() {
  return (
    <Canvas
      camera={{ position: [0, 1.5, 5] }}
      shadows={true}
      style={{ background: 'white' }}
    >
      <ambientLight intensity={0.8} />
      <spotLight
        position={[3, 3, 3]}
        angle={0.2}
        intensity={1.5}
        penumbra={0.2}
        castShadow
        shadow-bias={-0.0001}
      />
      <Suspense fallback={null}>
        <ResponsiveText />
        <RotatingRose />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}
