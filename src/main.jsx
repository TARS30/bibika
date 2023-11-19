import "./index.css";
import React from "react";
import App from "./App.jsx";
import ReactDOM from "react-dom/client";
import { Canvas } from "@react-three/fiber";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <div id="container">
      <div className="aim"></div>
      
      <Canvas camera={{fov: 90}} shadows>
        <App />
      </Canvas>
    </div>
  </React.StrictMode>
);
