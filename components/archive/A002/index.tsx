import React, { useEffect, useState } from "react";
import {
  Scene,
  OrthographicCamera,
  WebGLRenderer,
  PlaneBufferGeometry,
  RawShaderMaterial,
  Mesh,
  Vector2,
  Clock,
  CanvasTexture,
} from "three";
import WebFontLoader from "webfontloader";
import {
  CreateTextureParams,
  HandleResizeParams,
  UpdateParams,
} from "../../../shared/model";

const baseVert = require("./shader/index.vert");
const baseFrag = require("./shader/index.frag");

const A002: React.FC = () => {
  const [active, setActive] = useState(false);
  WebFontLoader.load({
    google: {
      families: ["EB Garamond"],
    },
    active: () => setActive(true),
  });

  let isNeedsStopUpdate = false;

  const createTexture = ({
    textureWidth,
    textureHeight,
    dpr,
  }: CreateTextureParams) => {
    const canvas = document.createElement("canvas");
    const canvasWidth = textureWidth * dpr;
    const canvasHeight = textureHeight * dpr;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const context = canvas.getContext("2d");
    if (context !== null) {
      context.font = `${128 * dpr}px EB Garamond`;
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillStyle = "#ffffff";
      for (let j = 0; j < 3; j++) {
        for (let i = 0; i < 8; i++) {
          context.fillText(
            "I Know You",
            j * canvasWidth * 0.75,
            i * (canvasHeight / 6)
          );
        }
      }
      const texture = new CanvasTexture(canvas);
      texture.needsUpdate = false;
      return texture;
    }
  };

  const update = ({
    scene,
    camera,
    renderer,
    uniforms,
    clock,
  }: UpdateParams<{ time: { type: string; value: number } }>) => {
    if (isNeedsStopUpdate) return;
    requestAnimationFrame(() =>
      update({ scene, camera, renderer, uniforms, clock })
    );
    uniforms.time.value += clock.getDelta();
    renderer.render(scene, camera);
  };

  const handleResize = (params: HandleResizeParams<{}>) => {
    const { scene, camera, renderer, uniforms } = params;
    isNeedsStopUpdate = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
    isNeedsStopUpdate = false;
  };
  const onCanvasLoaded = (canvas: HTMLCanvasElement) => {
    if (!canvas) return;
    const scene = new Scene();
    const camera = new OrthographicCamera(-1, 1, 1, -1, 1, 1000);
    camera.position.set(0, 0, 100);
    camera.lookAt(scene.position);
    const geometry = new PlaneBufferGeometry(2, 2);
    const dpr = window.devicePixelRatio;
    // const textureWidth = window.innerWidth;
    // const textureHeight = window.innerHeight;
    const textureWidth = 1024;
    const textureHeight = 1024;
    const baseTexture = createTexture({ textureWidth, textureHeight, dpr });
    const uniforms = {
      time: {
        type: "f",
        value: 0.0,
      },
      resolution: {
        type: "v2",
        value: new Vector2(window.innerWidth * dpr, window.innerHeight * dpr),
      },
      texture: {
        type: "t",
        value: baseTexture ?? null,
      },
    };
    const material = new RawShaderMaterial({
      uniforms: uniforms,
      vertexShader: baseVert.default,
      fragmentShader: baseFrag.default,
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
    renderer.setPixelRatio(dpr);
    renderer.setSize(window.innerWidth, window.innerHeight);
    update({ scene, camera, renderer, uniforms, clock });
    window.addEventListener("resize", () =>
      handleResize({ scene, camera, renderer, uniforms })
    );
  };
  useEffect(() => {
    return () => window.removeEventListener("resize", () => handleResize);
  }, []);
  return (
    <div className="container">{active && <canvas ref={onCanvasLoaded} />}</div>
  );
};

export default A002;
