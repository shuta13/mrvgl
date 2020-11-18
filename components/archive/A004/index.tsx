import React, { useEffect } from "react";
import {
  CanvasTexture,
  Clock,
  Mesh,
  OrthographicCamera,
  PlaneBufferGeometry,
  RawShaderMaterial,
  Scene,
  Vector2,
  WebGLRenderer,
} from "three";
import {
  CreateTextureParams,
  HandleResizeParams,
  UpdateParams,
} from "../../../shared/model";

const vert = require("./shader/index.vert");
const frag = require("./shader/index.frag");

export const A004: React.FC = () => {
  let animationFrameId = 0;
  let isNeedsStopUpdate = false;

  const createTexture = (params: CreateTextureParams) => {
    const { textureWidth, textureHeight, dpr } = params;
    const canvas = document.createElement("canvas");
    const canvasWidth = textureWidth * dpr;
    const canvasHeight = textureHeight * dpr;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const context = canvas.getContext("2d");
    if (!context) {
    }

    const texture = new CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  };

  const update = (
    params: UpdateParams<{ time: { type: string; value: number } }>
  ) => {
    if (isNeedsStopUpdate) return;
    const { scene, camera, renderer, uniforms, clock } = params;
    animationFrameId = requestAnimationFrame(() => update(params));
    if (uniforms.time.value > 1000) uniforms.time.value = 0.0;
    uniforms.time.value += clock.getDelta();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  };

  const handleResize = (params: HandleResizeParams<{}>) => {
    const { scene, camera, renderer, uniforms } = params;
    isNeedsStopUpdate = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  };

  useEffect(() => {
    return () => {
      window.removeEventListener("resize", () => handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const onCanvasLoaded = (canvas: HTMLCanvasElement) => {
    if (!canvas) return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const dpr = window.devicePixelRatio;

    const scene = new Scene();

    const camera = new OrthographicCamera(-1, 1, 1, -1, 1, 1000);
    camera.position.set(0, 0, 100);
    camera.lookAt(scene.position);
    scene.add(camera);

    const geometry = new PlaneBufferGeometry(2, 2);

    const uniforms = {
      time: {
        type: "f",
        value: 0.0,
      },
      resolution: {
        type: "v2",
        value: new Vector2(width * dpr, height * dpr),
      },
      texture: {
        type: "t",
        value: createTexture({ textureHeight: 1024, textureWidth: 1024, dpr }),
      },
    };

    const material = new RawShaderMaterial({
      uniforms: uniforms,
      vertexShader: "",
      fragmentShader: "",
    });

    const mesh = new Mesh(geometry, material);
    scene.add(mesh);

    const clock = new Clock();
    clock.start();

    const renderer = new WebGLRenderer({
      canvas: canvas,
      antialias: false,
      alpha: false,
    });
    renderer.setClearColor(0x1d1d1d);
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height);

    update({ scene, camera, renderer, uniforms, clock });

    window.addEventListener("resize", () =>
      handleResize({ scene, camera, renderer, uniforms })
    );
  };

  return <canvas ref={onCanvasLoaded} />;
};
