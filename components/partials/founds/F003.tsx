import React from "react";
import { Scene, PerspectiveCamera, WebGLRenderer, Color } from "three";

// types

type HandleResizeParams = {
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
}

type AnimateParams = {
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
}

//

const handleResize = ({ scene, camera, renderer }: HandleResizeParams) => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height)
}

const animate = ({ scene, camera, renderer }: AnimateParams) => {
  window.requestAnimationFrame(() => animate({ scene, camera, renderer }))
  renderer.render(scene, camera)
}

const F003: React.FC = () => {
  const onCanvasLoaded = (canvas: HTMLCanvasElement) => {
    if (!canvas) {
      return;
    }
    const scene = new Scene();
    const camera = new PerspectiveCamera(
      30,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    camera.position.z = 300;
    const renderer = new WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor("#1d1d1d");
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);

    animate({ scene, camera, renderer });

    window.addEventListener("resize", () => handleResize({ scene, camera, renderer }))
  };
  return (
    <div className="container">
      <canvas className="canvas" ref={onCanvasLoaded} />
    </div>
  );
};

export default F003;
