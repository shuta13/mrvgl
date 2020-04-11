import React, { useEffect } from "react";
import { Scene, PerspectiveCamera, WebGLRenderer } from "three";

// types, interface
type HandleResizeParams = {
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
};

const handleResize = ({ camera, renderer }: HandleResizeParams) => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
};

const _001: React.FC = () => {
  const onCanvasLoaded = (canvas: HTMLCanvasElement) => {
    if (!canvas) {
      return;
    }

    const scene = new Scene();
    const camera = new PerspectiveCamera(
      75,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    const renderer = new WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setClearColor("#1d1d1d");
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
    window.addEventListener("resize", () => handleResize({ camera, renderer }));
  };
  useEffect(() => {
    return () => window.removeEventListener("resize", () => handleResize);
  });
  return (
    <div className="container">
      <canvas ref={onCanvasLoaded}></canvas>
    </div>
  );
};

export default _001;
