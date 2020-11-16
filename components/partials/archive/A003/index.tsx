import React, { useEffect } from "react";
import {
  CanvasTexture,
  Clock,
  Mesh,
  OrthographicCamera,
  PlaneBufferGeometry,
  RawShaderMaterial,
  Scene,
  Texture,
  TextureLoader,
  Vector2,
  WebGLRenderer,
} from "three";

const vert = require("../A003/shader/index.vert");
const frag = require("../A003/shader/index.frag");

interface CreateTextureParams {
  textureWidth: number;
  textureHeight: number;
  dpr: number;
}

interface UpdateParams {
  scene: Scene;
  camera: OrthographicCamera;
  renderer: WebGLRenderer;
  uniforms: {
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
      // value: Texture;
    };
  };
  clock: Clock;
}

const A003: React.FC = () => {
  let animationFrameId = 0;

  const createTexture = (params: CreateTextureParams) => {
    const { textureWidth, textureHeight, dpr } = params;
    const canvas = document.createElement("canvas");
    const canvasWidth = textureWidth * dpr;
    const canvasHeight = textureHeight * dpr;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const context = canvas.getContext("2d");
    if (context !== null) {
      context.font = `italic bold ${128 * dpr}px Century Gothic `;
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillStyle = "#ffffff";
      context.fillText("Jellyfish", canvasWidth / 2, canvasHeight / 2);
      const texture = new CanvasTexture(canvas);
      texture.needsUpdate = false;
      return texture;
    }
  };

  const update = (params: UpdateParams) => {
    const { scene, camera, renderer, uniforms, clock } = params;
    animationFrameId = requestAnimationFrame(() => update(params));
    uniforms.time.value += clock.getDelta();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  };

  useEffect(() => {
    return () => cancelAnimationFrame(animationFrameId);
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
        value:
          createTexture({ textureWidth: 1024, textureHeight: 1024, dpr }) ??
          null,
        // value: new TextureLoader().load("/archive/Anonymous.svg", (texture) => {
        //   const material = new RawShaderMaterial({
        //     uniforms: uniforms,
        //     vertexShader: vert.default,
        //     fragmentShader: frag.default,
        //   });

        //   const mesh = new Mesh(geometry, material);
        //   scene.add(mesh);

        //   const clock = new Clock();
        //   clock.start();

        //   const renderer = new WebGLRenderer({
        //     canvas: canvas,
        //     antialias: false,
        //     alpha: false,
        //   });
        //   renderer.setClearColor(0x1d1d1d);
        //   renderer.setPixelRatio(dpr);
        //   renderer.setSize(width, height);

        //   update({ scene, camera, renderer, uniforms, clock });
        // }),
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

    //   // top
    //   const topScene = new Scene();
    //   const topCamera = new OrthographicCamera(-1, 1, 1, -1, 1, 1000);
    //   topCamera.position.set(0, 0, 100);
    //   topCamera.lookAt(topScene.position);
    //   topScene.add(topCamera);

    //   const topGeometry = new PlaneBufferGeometry(2, 2);

    //   const topUniforms = {
    //     time: {
    //       type: "f",
    //       value: 0.0,
    //     },
    //     resolution: {
    //       type: "v2",
    //       value: new Vector2(width * dpr, height * dpr),
    //     },
    //     texture: {
    //       type: "t",
    //       value: new CanvasTexture(canvas),
    //     },
    //   };

    //   const topMaterial = new RawShaderMaterial({
    //     uniforms: topUniforms,
    //     vertexShader: topVert.default,
    //     fragmentShader: topFrag.default,
    //   });

    //   const topMesh = new Mesh(topGeometry, topMaterial);
    //   scene.add(topMesh);

    //   const clock = new Clock();
    //   clock.start();

    //   const topRenderer = new WebGLRenderer({
    //     antialias: false,
    //     alpha: false,
    //   });
    //   topRenderer.setClearColor(0x1d1d1d);
    //   topRenderer.setPixelRatio(dpr);
    //   topRenderer.setSize(width, height);

    //   update({
    //     scene: topScene,
    //     camera: topCamera,
    //     renderer: topRenderer,
    //     uniforms: topUniforms,
    //     clock,
    //   });
    // };
  };
  return <canvas ref={onCanvasLoaded} />;
};

export default A003;
