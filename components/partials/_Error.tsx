import React, { useEffect } from "react";
import { WebGLRenderer, Scene, PerspectiveCamera } from "three";

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

export const _Error: React.FC<{ statusCode: number | undefined }> = ({
  statusCode,
}) => {
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
    renderer.setClearColor("#ffffff");
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);

    handleResize({ camera, renderer });
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
