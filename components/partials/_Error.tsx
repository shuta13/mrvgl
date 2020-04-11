import React, { useEffect } from "react";
import { WebGLRenderer, Scene, PerspectiveCamera, Object3D, Fog, DirectionalLight, AmbientLight } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass";

// types, interface
type HandleResizeParams = {
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
};

type PostProcessingParams = {
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
  object: Object3D;
}

type RenderSceneParams = {
  composer: EffectComposer;
  object: Object3D;
}

const handleResize = ({ camera, renderer }: HandleResizeParams) => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
};

const postProcessing = ({ scene, camera, renderer, object }: PostProcessingParams) => {
  const composer = new EffectComposer(renderer);
  const renderPass = new RenderPass(scene, camera);
  composer.addPass(renderPass);
  const glitchPass = new GlitchPass(10);
  glitchPass.renderToScreen = true;
  composer.addPass(glitchPass);
  renderScene({ composer, object });
}

const renderScene = ({ composer, object }: RenderSceneParams) => {
  window.requestAnimationFrame(() => renderScene({ composer, object }));
  object.rotation.x += 0.01;
  composer.render();
}

const _Error: React.FC<{ statusCode: number | undefined }> = ({
  statusCode
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
    camera.position.z = 400;
    const renderer = new WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setClearColor("#222222");
    renderer.setSize(window.innerWidth, window.innerHeight);
    const object = new Object3D();
    scene.add(object);

    postProcessing({ scene, camera, renderer, object });

    window.addEventListener("resize", () => handleResize({ camera, renderer }));
  };
  
  useEffect(() => {
    return () => window.removeEventListener("resize", () => handleResize);
  });

  return (
    <>
      <canvas className="canvas" ref={onCanvasLoaded}></canvas>
      <div className="ErrorText">
        { statusCode } - Missed Archive
      </div>
    </>
  );
};

export default _Error;