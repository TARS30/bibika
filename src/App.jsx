import "./App.css";

import { Sky } from "@react-three/drei";
import { Player } from "./player/Player";
import { Physics } from "@react-three/rapier";

import Ground from "./ground/Ground";
import Tunnel from "./tunnel/Tunnel";
import { Suspense } from "react";
const shadowOffset = 50;

function App() {
  return (
    <>
      <Sky sunPosition={[100, 20, 100]} />
      <ambientLight intensity={1.5} />
      <directionalLight
        castShadow
        intensity={2}
        position={[20,10, 0]}
        shadow-mapSize={1024}
        shadow-camera-top={shadowOffset}
        shadow-camera-bottom={shadowOffset}
        shadow-camera-left={shadowOffset}
        shadow-camera-right={shadowOffset}
      />
      <Suspense>
        <Physics gravity={[0, -100, 0]}  >
          <Ground />
          <Player />
          <Tunnel />
          {/* <RigidBody>
            <mesh rotation={[-1, 0, 0]} position={[0, -1, 20]}>
              <planeGeometry args={[30, 10]} />
              <meshStandardMaterial color="gray" />
            </mesh>
          </RigidBody> */}
        </Physics>
      </Suspense>
    </>
  );
}

export default App;
