// refer
// https://threejs.org/examples/?q=webgl_buffergeometry#webgl_buffergeometry_drawrange

import React from "react";
import { Scene, PerspectiveCamera, WebGLRenderer } from "three";

const F002: React.FC = () => {
  const onCanvasLoaded = (canvas: HTMLCanvasElement) => {
    if (!canvas) {
      return;
    }

    const scene = new Scene();
    const camera = new PerspectiveCamera(
      45,
      canvas.clientWidth / canvas.clientHeight,
      1,
      1000
    );
    camera.lookAt(scene.position);
    const renderer = new WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setClearColor("#cccccc");
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  };
  return (
    <div className="container">
      <canvas className="canvas" ref={onCanvasLoaded} />
    </div>
  );
};

export default F002;
