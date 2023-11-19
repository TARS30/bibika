import * as THREE from "three";
import { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { usePersonControls } from "../hooks/hooks";

const MOVE_SPEED = 10;
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();

export function Player(props) {
  const playerRef = useRef();
  const btrRef = useRef();
  const { forward, backward, left, right } = usePersonControls();

  const { nodes, materials } = useGLTF("/btr.glb");

  useFrame((state) => {
    if (!playerRef.current) return;

    frontVector.setZ(forward - backward).normalize();

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(MOVE_SPEED)
      .applyEuler(btrRef.current.rotation);

    const { x, y, z } = playerRef.current.translation();
    playerRef.current.wakeUp();
    playerRef.current.setLinvel({
      x: direction.x,
      y: direction.y,
      z: direction.z,
    });
    state.camera.position.set(x, y + 5, z + 1);

    state.camera.rotation.set(-0.5, 0, 0);

    if ((right && forward) || (left && backward)) {
      btrRef.current.rotation.y += -0.01;
    }
    if ((left && forward) || (right && backward)) {
      btrRef.current.rotation.y += 0.01;
    }
  });
  return (
    <>
      <RigidBody
        mass={10}
        position={[0, -1, 50]}
        ref={playerRef}
      >
        <mesh
          castShadow
          receiveShadow
          ref={btrRef}
          position={[0, 0, -10]}
          rotation-y={-Math.PI}
        >
          <group {...props} dispose={null}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_4.geometry}
              material={materials.tank_tex}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_6.geometry}
              material={materials.tank_tex}
              position={[-0.002, 1.737, 0.829]}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_8.geometry}
              material={materials.tank_tex}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_10.geometry}
              material={materials.tank_tex}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_12.geometry}
              material={materials.tank_tex}
            />
          </group>
        </mesh>
      </RigidBody>
    </>
  );
}

useGLTF.preload("/btr.glb");
