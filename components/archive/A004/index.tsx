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

const vertGauss = require("./shader/gauss.vert");
const fragGauss = require("./shader/gauss.frag");

const A004: React.FC = () => {
  const [active, setActive] = useState(false);
  WebFontLoader.load({
    google: {
      families: ["Text Me One", "Astloch"],
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
      context.textAlign = "center";
      // context.textBaseline = "middle";

      context.font = `bold italic ${160 * dpr}px Astloch`;
      context.fillStyle = "#69e5ff"; // 青
      context.fillText(
        "深淵を覗くとき",
        canvasWidth * 0.5,
        canvasHeight * 0.25
      );

      context.font = `bold ${400 * dpr}px Text Me One`;
      context.fillStyle = "#e36bee"; // ピンク
      context.fillText("深淵", canvasWidth * 0.5, canvasHeight * 0.65);

      context.font = `bold italic ${160 * dpr}px Astloch`;
      context.fillStyle = "#69e5ff"; // 青
      context.fillText(
        "もまたこちらを覗いている",
        canvasWidth * 0.5,
        canvasHeight * 0.9
      );
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

    // calc offset, weight
    /**
     * @see {https://qiita.com/edo_m18/items/c43177c0a18a2ea210b6}
     */
    const bloomConfig = {
      sampleCount: 15,
    };
    const offset = {
      horizontal: new Float32Array(),
      vertical: new Float32Array(),
      tmpHorizontal: [0],
      tmpVertical: [0],
      vector2Horizontal: [new Vector2(0, 0)],
      vector2Vertical: [new Vector2(0, 0)],
    };
    const weight = {
      horizontal: [0],
      vertical: [0],
      totalHorizontal: 0,
      totalVertical: 0,
    };
    for (let i = 0; i < bloomConfig.sampleCount; i++) {
      const p = (i - (bloomConfig.sampleCount - 1) * 0.5) * 0.0006;

      offset.tmpHorizontal[i] = p;
      weight.horizontal[i] = Math.exp((-p * p) / 2) / Math.sqrt(Math.PI * 2);
      weight.totalHorizontal += weight.horizontal[i];

      offset.tmpVertical[i] = p;
      weight.vertical[i] = Math.exp((-p * p) / 2) / Math.sqrt(Math.PI * 2);
      weight.totalVertical += weight.vertical[i];
    }
    weight.horizontal.map((value, index) => {
      weight.horizontal[index] = value / weight.totalHorizontal;
    });
    weight.vertical.map((value, index) => {
      weight.vertical[index] = value / weight.totalVertical;
    });
    offset.tmpHorizontal.map((value, index) => {
      offset.vector2Horizontal[index] = new Vector2(value, 0);
    });
    offset.tmpVertical.map((value, index) => {
      offset.vector2Vertical[index] = new Vector2(0, value);
    });

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
      offsetHorizontal: {
        type: "v2v",
        value: offset.vector2Horizontal,
      },
      offsetVertical: {
        type: "v2v",
        value: offset.vector2Vertical,
      },
      weightHorizontal: {
        type: "fv1",
        value: weight.horizontal,
      },
      weightVertical: {
        type: "fv1",
        value: weight.vertical,
      },
      isVertical: {
        type: "b",
        value: false,
      },
    };

    const material = new RawShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertGauss.default,
      fragmentShader: fragGauss.default,
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
