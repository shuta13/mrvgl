import React, { useEffect, useState } from "react";
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
import WebFontLoader from "webfontloader";

const vert = require("./shader/index.vert");
const frag = require("./shader/index.frag");

const A004: React.FC = () => {
  const [active, setActive] = useState(false);
  WebFontLoader.load({
    google: {
      families: ["Text Me One"],
    },
    active: () => setActive(true),
  });

  let animationFrameId = 0;
  let isNeedsStopUpdate = false;

  // const gridImage = new Image();

  const createTexture = (params: CreateTextureParams) => {
    const { textureWidth, textureHeight, dpr } = params;

    // gridImage.src = require("../../../assets/image/004/grid.png");

    const canvas = document.createElement("canvas");
    const canvasWidth = textureWidth * dpr;
    const canvasHeight = textureHeight * dpr;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const context = canvas.getContext("2d");
    if (context !== null) {
      const text = "2021";
      context.textAlign = "center";
      context.textBaseline = "middle";

      context.font = `bold ${400 * dpr}px Text Me One`;
      context.fillStyle = "#ffffff";
      // context.fillStyle = `rgba${[0, 0, 0, 0]}`;
      context.fillText(text, canvasWidth * 0.5, canvasHeight * 0.5);

      // context.globalCompositeOperation = "destination-over";
      // context.drawImage(gridImage, canvasWidth * 0.5, canvasHeight * 0.5);
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
    isNeedsStopUpdate = false;
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
      texture: {
        type: "t",
        value: createTexture({ textureHeight: 1024, textureWidth: 2048, dpr }),
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

  return <>{active && <canvas ref={onCanvasLoaded} />}</>;
};

export default A004;
