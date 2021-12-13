import React, { useEffect } from "react";
import {
  Scene,
  OrthographicCamera,
  WebGLRenderer,
  PlaneBufferGeometry,
  RawShaderMaterial,
  Mesh,
  Clock,
  Vector2,
} from "three";

type HandleResizeParams = {
  camera: OrthographicCamera;
  renderer: WebGLRenderer;
};
type UpdateParams = {
  scene: Scene;
  camera: OrthographicCamera;
  renderer: WebGLRenderer;
  uniforms: any;
  clock: Clock;
};

const vert = require("./shader/index.vert");
const frag = require("./shader/index.frag");

const _Error: React.FC<{ statusCode: number | undefined }> = ({
  statusCode,
}) => {
  let isNeedsStopUpdate = false;

  const handleResize = ({ camera, renderer }: HandleResizeParams) => {
    isNeedsStopUpdate = true;
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    isNeedsStopUpdate = false;
  };

  const update = ({
    scene,
    camera,
    renderer,
    uniforms,
    clock,
  }: UpdateParams) => {
    if (isNeedsStopUpdate) return;
    requestAnimationFrame(() =>
      update({ scene, camera, renderer, uniforms, clock })
    );
    uniforms.time.value += clock.getDelta();
    renderer.render(scene, camera);
  };

  const onCanvasLoaded = (canvas: HTMLCanvasElement) => {
    if (!canvas) {
      return;
    }
    const scene = new Scene();
    const camera = new OrthographicCamera(-1, 1, 1, -1, 1, 1000);
    camera.position.set(0, 0, 100);
    camera.lookAt(scene.position);
    const geometry = new PlaneBufferGeometry(2, 2);
    const uniforms = {
      time: {
        type: "f",
        value: 0.0,
      },
      resolution: {
        type: "v2",
        value: new Vector2(window.innerWidth, window.innerHeight),
      },
    };
    const material = new RawShaderMaterial({
      uniforms: uniforms,
      vertexShader: vert.default,
      fragmentShader: frag.default,
    });
    const mesh = new Mesh(geometry, material);
    scene.add(mesh);
    const clock = new Clock();
    clock.start();
    const renderer = new WebGLRenderer({
      canvas: canvas,
      antialias: false,
    });
    renderer.setClearColor(0x1d1d1d);
    renderer.setPixelRatio(window.devicePixelRatio);
    update({ scene, camera, renderer, uniforms, clock });
    window.addEventListener("resize", () => handleResize({ camera, renderer }));
  };

  useEffect(() => {
    return () => window.removeEventListener("resize", () => handleResize);
  });

  return (
    <>
      <canvas className="canvas" ref={onCanvasLoaded}></canvas>
      <div className="ErrorText">{statusCode} - Missed Archive</div>
    </>
  );
};

export default _Error;
