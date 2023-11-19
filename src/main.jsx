import "./index.css";
import React from "react";
import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div id="container">
      <div className="aim"></div>
      {/* <Canvas id='camera' camera={{ fov: 45, position: [0, 0, 0], rotation:[-0.25,0,0]}}> */}
      <Canvas>
        <App />
      </Canvas>
    </div>
  </React.StrictMode>
);
