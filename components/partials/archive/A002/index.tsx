import React, { useEffect } from "react";
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

type CreateTextureParams = {
  textureWidth: number;
  textureHeight: number;
  dpr: number;
};
type UpdateParams = {
  scene: Scene;
  camera: OrthographicCamera;
  renderer: WebGLRenderer;
  baseUniforms: any;
  clock: Clock;
};
type HandleResizeParams = {
  renderer: WebGLRenderer;
  baseUniforms: {
    time: {
      type: string;
      value: number;
    };
    resolution: {
      type: string;
      value: Vector2;
    };
    texture: {
      type: string;
      value?: CanvasTexture | null;
    };
  };
};

const baseVert = require("./shader/index.vert");
const baseFrag = require("./shader/index.frag");

const A002: React.FC = () => {
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
      context.font = `${128 * dpr}px serif`;
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
    baseUniforms,
    clock,
  }: UpdateParams) => {
    if (isNeedsStopUpdate) return;
    requestAnimationFrame(() =>
      update({ scene, camera, renderer, baseUniforms, clock })
    );
    baseUniforms.time.value += clock.getDelta();
    renderer.render(scene, camera);
  };

  const handleResize = ({ renderer, baseUniforms }: HandleResizeParams) => {
    isNeedsStopUpdate = true;
    renderer.setSize(window.innerWidth, window.innerHeight);
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
    const baseUniforms = {
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
      uniforms: baseUniforms,
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
    update({ scene, camera, renderer, baseUniforms, clock });
    window.addEventListener("resize", () =>
      handleResize({ renderer, baseUniforms })
    );
  };
  useEffect(() => {
    return () => window.removeEventListener("resize", () => handleResize);
  }, []);
  return (
    <div className="container">
      <canvas ref={onCanvasLoaded} />
    </div>
  );
};

export default A002;
