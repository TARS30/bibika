import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import fence from "./fence.jpg";
import winTexture from "./win.png";
import { useState } from "react";

const Tunnel = () => {
  const texture = useTexture(fence);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  const winText = useTexture(winTexture);
  winText.wrapS = winText.wrapT = THREE.RepeatWrapping;

  const [isWin, setIsWin] = useState(false)

  return (
    <>
      <RigidBody>
        <mesh rotation={[0, Math.PI / 2, 0]} position={[-15, 4, 0]}>
          <planeGeometry args={[100, 10]} />
          <meshStandardMaterial
            color="gray"
            map={texture}
            map-repeat={[5, 1]}
          />
        </mesh>
      </RigidBody>
      <RigidBody>
        <mesh rotation={[0, -Math.PI / 2, 0]} position={[15, 4, 0]}>
          <planeGeometry args={[100, 10]} />
          <meshStandardMaterial
            color="gray"
            map={texture}
            map-repeat={[5, 1]}
          />
        </mesh>
      </RigidBody>
      <RigidBody>
        <mesh rotation={[0, -Math.PI, 0]} position={[0, 4, 50]}>
          <planeGeometry args={[30, 10]} />
          <meshStandardMaterial
            color="gray"
            map={texture}
            map-repeat={[5, 1]}
          />
        </mesh>
      </RigidBody>
      <RigidBody>
        <mesh rotation={[0, 0, 0]} position={[10, 4, 20]}>
          <planeGeometry args={[30, 10]} />
          <meshStandardMaterial
            color="gray"
            map={texture}
            map-repeat={[5, 1]}
          />
        </mesh>
      </RigidBody>
      <RigidBody>
        <mesh rotation={[0, 0, 0]} position={[-10, 4, -10]}>
          <planeGeometry args={[30, 10]} />
          <meshStandardMaterial
            color="gray"
            map={texture}
            map-repeat={[5, 1]}
          />
        </mesh>
      </RigidBody>

      <RigidBody>
        <mesh rotation={[0, 0, 0]} position={[10, 4, -30]}>
          <planeGeometry args={[30, 10]} />
          <meshStandardMaterial
            color="gray"
            map={texture}
            map-repeat={[5, 1]}
          />
        </mesh>
      </RigidBody>
      <RigidBody onContactForce={() => setIsWin(true)}>
        <mesh rotation={[0, 0, 0]} position={[0, 4, -50]}>
          <planeGeometry args={[30, 10]} />
          <meshStandardMaterial
            color="gray"
            map={isWin ? winText : texture}
            map-repeat={[1, 1]}
          />
        </mesh>
      </RigidBody>
    </>
  );
};

export default Tunnel;
