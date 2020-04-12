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
  pointCloud: Points
};

//

const maxParticleCount = 1000;
const particleCount = 800;
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
  particleCount: 500,
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
  pointCloud
}: AnimateParams) => {
  let vertexPos = 0;
  let colorPos = 0;
  let numConnected = 0;

  for (let i = 0; i < particleCount; i++) {
    particlesData[i].numConnections = 0;
  }

  for (let i = 0; i < particleCount; i++) {
    const particleData = particlesData[i];

    particlePositions[i * 3] += particleData.velocity.x;
    particlePositions[i * 3 + 1] += particleData.velocity.y;
    particlePositions[i * 3 + 2] += particleData.velocity.z;

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
    if (
      effectController.limitConnections &&
      particleData.numConnections >= effectController.maxConnections
    ) {
      continue;
    }

    for (let j = i + 1; j < particleCount; j++) {
      const particleDataB = particlesData[j];
      if (
        effectController.limitConnections &&
        particleDataB.numConnections >= effectController.maxConnections
      ) {
        continue;
      }
      const dx = particlePositions[i * 3] - particlePositions[j * 3];
      const dy = particlePositions[i * 3 + 1] - particlePositions[j * 3 + 1];
      const dz = particlePositions[i * 3 + 2] - particlePositions[j * 3 + 2];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (dist < effectController.minDistance) {
        particleData.numConnections++;
        particleDataB.numConnections++;

        const alpha = 1.0 - dist / effectController.minDistance;

        positions[vertexPos++] = particlePositions[i * 3];
        positions[vertexPos++] = particlePositions[i * 3 + 1];
        positions[vertexPos++] = particlePositions[i * 3 + 2];

        positions[vertexPos++] = particlePositions[j * 3];
        positions[vertexPos++] = particlePositions[j * 3 + 1];
        positions[vertexPos++] = particlePositions[j * 3 + 2];

        colors[colorPos++] = alpha;
        colors[colorPos++] = alpha;
        colors[colorPos++] = alpha;

        colors[colorPos++] = alpha;
        colors[colorPos++] = alpha;
        colors[colorPos++] = alpha;

        numConnected++;
      }
    }
  }
  const l = linesMesh.geometry as any
  l.setDrawRange(0, numConnected * 2)
  l.attributes.position.needsUpdate = true;
  l.attributes.color.needsUpdate = true;

  const p = pointCloud.geometry as any
  p.attributes.position.needsUpdate = true

  window.requestAnimationFrame(() =>
    animate({
      scene,
      camera,
      renderer,
      particlePositions,
      positions,
      colors,
      linesMesh,
      pointCloud
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

    const scene = new Scene();
    const camera = new PerspectiveCamera(
      45,
      canvas.clientWidth / canvas.clientHeight,
      1,
      4000
    );
    camera.position.z = 1750;

    const group = new Group();
    scene.add(group);
    const helper = new BoxHelper(new Mesh(new BoxBufferGeometry(r, r, r)));
    const h = helper.material as any;
    h.color.setHex(0x101010);
    h.blending = AdditiveBlending;
    h.transparent = true;
    group.add(helper);

    const segments = maxParticleCount * maxParticleCount;
    const positions = new Float32Array(segments * 3);
    const colors = new Float32Array(segments * 3);
    const pMaterial = new PointsMaterial({
      color: 0xffffff,
      size: 3,
      blending: AdditiveBlending,
      transparent: true,
      sizeAttenuation: false,
    });
    const particles = new BufferGeometry();
    const particlePositions = new Float32Array(maxParticleCount * 3);

    for (let i = 0; i < maxParticleCount; i++) {
      const x = Math.random() * r - r / 2;
      const y = Math.random() * r - r / 2;
      const z = Math.random() * r - r / 2;

      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;

      particlesData.push({
        velocity: new Vector3(
          -1 + Math.random() * 2,
          -1 + Math.random() * 2,
          -1 + Math.random() * 2
        ),
        numConnections: 0,
      });
    }

    particles.setDrawRange(0, particleCount);
    particles.setAttribute(
      "position",
      new BufferAttribute(particlePositions, 3).setUsage(DynamicDrawUsage)
    );

    const pointCloud = new Points(particles, pMaterial);
    group.add(pointCloud);

    const geometry = new BufferGeometry();
    geometry.setAttribute(
      "position",
      new BufferAttribute(positions, 3).setUsage(DynamicDrawUsage)
    );
    geometry.setAttribute(
      "color",
      new BufferAttribute(colors, 3).setUsage(DynamicDrawUsage)
    );
    geometry.computeBoundingSphere();
    geometry.setDrawRange(0, 0);

    const material = new LineBasicMaterial({
      vertexColors: true,
      blending: AdditiveBlending,
      transparent: true,
    });

    const linesMesh = new LineSegments(geometry, material);
    group.add(linesMesh);

    const renderer = new WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setClearColor("#1d1d1d");
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
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
      pointCloud
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
