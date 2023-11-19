import "./App.css";

import { Sky } from "@react-three/drei";
import { Player } from "./player/Player";
import { Physics } from "@react-three/rapier";

import Ground from "./ground/Ground";

function App() {
  return (
    <>
      <Sky sunPosition={[100, 20, 100]} />
      <ambientLight intensity={1.5} />
      <Physics gravity={[0, -20, 0]}>
        <Ground />
        <Player />
      </Physics>
    </>
  );
}

export default App;
