// refer
// https://threejs.org/examples/?q=webgl_buffergeometry#webgl_buffergeometry_drawrange

import React, { useEffect } from "react";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Group,
  BoxHelper,
  Mesh,
  BoxBufferGeometry,
  AdditiveBlending,
  PointsMaterial,
  BufferGeometry,
  Vector3,
  BufferAttribute,
  DynamicDrawUsage,
  Points,
  LineBasicMaterial,
  LineSegments,
  sRGBEncoding,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
const { GUI } = require("three/examples/jsm/libs/dat.gui.module");

// types
type HandleResizeParams = {
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
};

type AnimateParams = {
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
  particlePositions: Float32Array;
  positions: Float32Array;
  colors: Float32Array;
  linesMesh: LineSegments;
  pointCloud: Points;
};

//

const maxParticleCount = 400;
const particleCount = 100;
const r = 800;
const rHalf = 800 / 2;
const particlesData: Array<{
  velocity: Vector3;
  numConnections: number;
}> = [];
const effectController = {
  showDots: true,
  showLines: true,
  minDistance: 150,
  limitConnections: false,
  maxConnections: 20,
  particleCount: 100,
};

//

const handleResize = ({ camera, renderer }: HandleResizeParams) => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
};

const animate = ({
  scene,
  camera,
  renderer,
  particlePositions,
  positions,
  colors,
  linesMesh,
  pointCloud,
}: AnimateParams) => {
  let vertexPos = 0;
  let colorPos = 0;
  let numConnected = 0;

  for (let i = 0; i < particleCount; i++) {
    particlesData[i].numConnections = 0;
  }

  for (let i = 0; i < particleCount; i++) {
    const particleData = particlesData[i];

    // パーティクルの位置更新
    particlePositions[i * 3] += particleData.velocity.x;
    particlePositions[i * 3 + 1] += particleData.velocity.y;
    particlePositions[i * 3 + 2] += particleData.velocity.z;

    // 正方形の壁に内面にぶつかった時反射する処理
    if (particlePositions[i * 3] < -rHalf || particlePositions[i * 3] > rHalf) {
      particleData.velocity.x = -particleData.velocity.x;
    }
    if (
      particlePositions[i * 3 + 1] < -rHalf ||
      particlePositions[i * 3 + 1] > rHalf
    ) {
      particleData.velocity.y = -particleData.velocity.y;
    }
    if (
      particlePositions[i * 3 + 2] < -rHalf ||
      particlePositions[i * 3 + 2] > rHalf
    ) {
      particleData.velocity.z = -particleData.velocity.z;
    }

    // これよくわからん、手の数の制限?
    if (
      effectController.limitConnections &&
      particleData.numConnections >= effectController.maxConnections
    ) {
      continue;
    }

    // 線の情報更新
    for (let j = i + 1; j < particleCount; j++) {
      const particleDataB = particlesData[j];
      if (
        effectController.limitConnections &&
        particleDataB.numConnections >= effectController.maxConnections
      ) {
        continue;
      }
      // 距離
      const dx = particlePositions[i * 3] - particlePositions[j * 3];
      const dy = particlePositions[i * 3 + 1] - particlePositions[j * 3 + 1];
      const dz = particlePositions[i * 3 + 2] - particlePositions[j * 3 + 2];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

      // 線をつなぐ処理
      if (dist < effectController.minDistance) {
        // つなぐ本数が増える
        particleData.numConnections++;
        particleDataB.numConnections++;

        // 線の色のeasing、距離が離れる程に0に漸近する
        const alpha = 1.0 - dist / effectController.minDistance;

        // 1つ目の頂点の位置
        positions[vertexPos++] = particlePositions[i * 3];
        positions[vertexPos++] = particlePositions[i * 3 + 1];
        positions[vertexPos++] = particlePositions[i * 3 + 2];

        // 2つ目の頂点、つなぎ先の位置
        positions[vertexPos++] = particlePositions[j * 3];
        positions[vertexPos++] = particlePositions[j * 3 + 1];
        positions[vertexPos++] = particlePositions[j * 3 + 2];

        // 1つ目の頂点の色
        colors[colorPos++] = alpha;
        colors[colorPos++] = alpha;
        colors[colorPos++] = alpha;

        // 2つ目の頂点、つなぎ先の色
        colors[colorPos++] = alpha;
        colors[colorPos++] = alpha;
        colors[colorPos++] = alpha;

        numConnected++;
      }
    }
  }
  const l = linesMesh.geometry as any;
  l.setDrawRange(0, numConnected * 2);
  l.attributes.position.needsUpdate = true;
  l.attributes.color.needsUpdate = true;

  const p = pointCloud.geometry as any;
  p.attributes.position.needsUpdate = true;

  window.requestAnimationFrame(() =>
    animate({
      scene,
      camera,
      renderer,
      particlePositions,
      positions,
      colors,
      linesMesh,
      pointCloud,
    })
  );
  renderer.render(scene, camera);
};

//

const F002: React.FC = () => {
  const onCanvasLoaded = (canvas: HTMLCanvasElement) => {
    if (!canvas) {
      return;
    }

    // init GUI
    const gui = new GUI();
    gui.add(effectController, "showDots").onChange((value: boolean) => {
      pointCloud.visible = value;
    });
    gui.add(effectController, "showLines").onChange((value: boolean) => {
      linesMesh.visible = value;
    });
    gui.add(effectController, "minDistance", 10, 300);
    gui.add(effectController, "limitConnections");
    gui.add(effectController, "maxConnections", 0, 30, 1);
    gui
      .add(effectController, "particleCount", 0, maxParticleCount, 1)
      .onChange((value: string) => {
        const particleCount = parseInt(value);
        particles.setDrawRange(0, particleCount);
      });

    // init
    const scene = new Scene();
    const camera = new PerspectiveCamera(
      45,
      canvas.clientWidth / canvas.clientHeight,
      1,
      4000
    );
    camera.position.z = 1750;
    // groupでパフォーマンス考慮
    const group = new Group();
    scene.add(group);

    // 枠組みの正方形
    const helper = new BoxHelper(new Mesh(new BoxBufferGeometry(r, r, r)));
    const h = helper.material as any;
    h.color.setHex(0xff1111);
    // 加算合成、発光する感じ : https://ics.media/entry/11401/
    h.blending = AdditiveBlending;
    h.transparent = true;
    group.add(helper);

    // 頂点のinit
    // Float32Arrayでmax^2確保(パーティクル1つから最大4本手が生える)
    const segments = maxParticleCount * maxParticleCount;
    const positions = new Float32Array(segments * 3);
    const colors = new Float32Array(segments * 3);

    // 頂点のマテリアル
    const pMaterial = new PointsMaterial({
      color: 0xff1111,
      size: 3,
      blending: AdditiveBlending,
      transparent: true,
      sizeAttenuation: false,
    });
    const particles = new BufferGeometry();
    // パーティクルの位置max*3確保(パーティクルの最大数分のx,y,zで位置を確定)
    const particlePositions = new Float32Array(maxParticleCount * 3);

    // パーティクルの位置をランダムに決める
    // 正方形の真ん中を基準
    for (let i = 0; i < maxParticleCount; i++) {
      const x = Math.random() * r - r / 2;
      const y = Math.random() * r - r / 2;
      const z = Math.random() * r - r / 2;

      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;

      particlesData.push({
        // 3次元ベクトル
        // -1 ~ 1の範囲にする、正規化みたいな感じ
        // 頂点をバラバラに動かすための重み?
        velocity: new Vector3(
          -1 + Math.random() * 2,
          -1 + Math.random() * 2,
          -1 + Math.random() * 2
        ),
        numConnections: 0,
      });
    }

    // paticleCountの数だけ頂点を表示
    particles.setDrawRange(0, particleCount);
    // よくわからん : https://developer.mozilla.org/ja/docs/Web/API/WebGLRenderingContext/bufferData っぽい
    particles.setAttribute(
      "position",
      new BufferAttribute(particlePositions, 3).setUsage(DynamicDrawUsage)
    );
    // 頂点を表示 : https://threejs.org/docs/#api/en/objects/Points
    const pointCloud = new Points(particles, pMaterial);
    group.add(pointCloud);

    // 線のジオメトリー作成
    const geometry = new BufferGeometry();
    geometry.setAttribute(
      "position",
      new BufferAttribute(positions, 3).setUsage(DynamicDrawUsage)
    );
    geometry.setAttribute(
      "color",
      new BufferAttribute(colors, 3).setUsage(DynamicDrawUsage)
    );
    // リアルに跳ね返らせる演算
    geometry.computeBoundingSphere();
    geometry.setDrawRange(0, 0);

    // 線のマテリアル作成
    const material = new LineBasicMaterial({
      vertexColors: true,
      blending: AdditiveBlending,
      transparent: true,
    });

    // 線のメッシュ
    const linesMesh = new LineSegments(geometry, material);
    // 線描画
    group.add(linesMesh);

    const renderer = new WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setClearColor("#1d1d1d");
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 枠組みの正方形の色付け?
    renderer.outputEncoding = sRGBEncoding;
    renderer.render(scene, camera);

    if (process.env.ENV === "dev") {
      new OrbitControls(camera, renderer.domElement);
    }

    animate({
      scene,
      camera,
      renderer,
      particlePositions,
      positions,
      colors,
      linesMesh,
      pointCloud,
    });

    window.addEventListener(
      "resize",
      () => handleResize({ camera, renderer }),
      false
    );
  };
  useEffect(() => {
    return () => window.removeEventListener("resize", () => handleResize);
  });
  return (
    <div className="container">
      <canvas className="canvas" ref={onCanvasLoaded} />
    </div>
  );
};

export default F002;
