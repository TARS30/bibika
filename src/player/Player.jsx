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

    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      0.01,
      1
    );
    camera.position.set(0, 0.3, 0);
    camera.lookAt(state.scene.position);
    const velocity = playerRef.current.linvel();

    frontVector.setZ(forward - backward);
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(MOVE_SPEED)
      .applyEuler(btrRef.current.rotation);

    const { x, y, z } = playerRef.current.translation();
    playerRef.current.wakeUp();
    playerRef.current.setLinvel({
      x: direction.x,
      y: velocity.y,
      z: direction.z,
    });
    state.camera.position.set(x, y + 20, z + 10);
    state.camera.rotation.set(-0.75, 0, 0);
    // console.log(state.camera.rotation)
    if ((left && forward) || (left && backward)) {
      btrRef.current.rotation.y += -0.01;
    }
    if ((right && forward) || (right && backward)) {
      btrRef.current.rotation.y += 0.01;
    }
  });
  return (
    <>
      <RigidBody ref={playerRef}>
        {/* <mesh position={[0, 0, -10]} rotation={[0, Math.PI, 0]}> */}
        <mesh ref={btrRef} position={[0, 0, -10]}>
          <group {...props} dispose={null} rotation-y={[Math.PI]}>
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
