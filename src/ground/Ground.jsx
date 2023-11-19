import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import groundTexture from "./bricks.jpg";
import { RigidBody } from "@react-three/rapier";

const Ground = () => {
  const texture = useTexture(groundTexture);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  return (
    <RigidBody>
      <mesh receiveShadow position={[0, -1, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[500, 500]} />
        <meshStandardMaterial
          color="gray"
          map={texture}
          map-repeat={[100, 100]}
        />
      </mesh>
    </RigidBody>
  );
};

export default Ground;
