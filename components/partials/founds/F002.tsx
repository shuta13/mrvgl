// refer
// https://threejs.org/examples/?q=webgl_buffergeometry#webgl_buffergeometry_drawrange

import React, { useEffect } from "react";
import { Scene, PerspectiveCamera, WebGLRenderer, Group, BoxHelper, Mesh, BoxBufferGeometry, AdditiveBlending, PointsMaterial, BufferGeometry, Vector3, BufferAttribute, DynamicDrawUsage, Points, LineBasicMaterial, LineSegments, sRGBEncoding } from "three";
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
};

//

const handleResize = ({ camera, renderer }: HandleResizeParams) => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
};

const animate = ({ scene, camera, renderer, particlePositions }: AnimateParams) => {
  const vertexPos = 0;
  const colorPos = 0;
  const numConnected = 0;

  for (let i = 0; i < particleCount; i++) {
    particlesData[i].numConnections = 0;
  }

  for (let i = 0; i < particleCount; i++) {
    const particleData = particlesData[i]

    particlePositions[i * 3] += particleData.velocity.x;
    particlePositions[i * 3 + 1] += particleData.velocity.y;
    particlePositions[i * 3 + 2] += particleData.velocity.z;

    if (particlePositions[i * 3] < -rHalf || particlePositions[i * 3] > rHalf) {
      particleData.velocity.x = - particleData.velocity.x;
    }
    if (particlePositions[i * 3 + 1] < -rHalf || particlePositions[i * 3 + 1] > rHalf) {
      particleData.velocity.y = -particleData.velocity.y;
    }
    if (particlePositions[i * 3 + 2] < -rHalf || particlePositions[i * 3 + 2] > rHalf) {
      particleData.velocity.z = -particleData.velocity.z
    }
  }

  window.requestAnimationFrame(() =>
    animate({ scene, camera, renderer, particlePositions })
  );
  renderer.render(scene, camera);
};

//

const maxParticleCount = 1000
const particleCount = 800
const r = 800
const rHalf = 800 / 2
const particlesData: Array<{
  velocity: Vector3;
  numConnections: number;
}> = []

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

    const group = new Group()
    scene.add(group)
    const helper = new BoxHelper(new Mesh(new BoxBufferGeometry(r, r, r)))
    const h = helper.material as any
    h.color.setHex(0x101010);
    h.blending = AdditiveBlending;
    h.transparent = true
    group.add(helper)

    const segments = maxParticleCount * maxParticleCount;
    const positions = new Float32Array(segments * 3)
    const colors = new Float32Array(segments * 3)
    const pMaterial = new PointsMaterial({
      color: 0xFFFFFF,
      size: 3,
      blending: AdditiveBlending,
      transparent: true,
      sizeAttenuation: false
    })
    const particles = new BufferGeometry()
    const particlePositions = new Float32Array(maxParticleCount * 3)

    for (let i = 0; i < maxParticleCount; i++) {
      const x = Math.random() * r - r / 2;
      const y = Math.random() * r - r / 2;
      const z = Math.random() * r - r / 2;

      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;

      particlesData.push({
        velocity: new Vector3(-1 + Math.random() * 2, -1 + Math.random() * 2, -1 + Math.random() * 2),
        numConnections: 0
      })
    }

    particles.setDrawRange(0, particleCount)
    particles.setAttribute("position", new BufferAttribute(particlePositions, 3).setUsage(DynamicDrawUsage))

    const pointCloud = new Points(particles, pMaterial)
    group.add(pointCloud)

    const geometry = new BufferGeometry()
    geometry.setAttribute("position", new BufferAttribute(positions, 3).setUsage(DynamicDrawUsage))
    geometry.setAttribute("color", new BufferAttribute(colors, 3).setUsage(DynamicDrawUsage))
    geometry.computeBoundingSphere()
    geometry.setDrawRange(0, 0)

    const material = new LineBasicMaterial({
      vertexColors: true,
      blending: AdditiveBlending,
      transparent: true
    })

    const linesMesh = new LineSegments(geometry, material)
    group.add(linesMesh)

    const renderer = new WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setClearColor("#1d1d1d");
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.outputEncoding = sRGBEncoding;
    renderer.render(scene, camera);

    if (process.env.ENV === "dev") {
      new OrbitControls(camera, renderer.domElement);
    }

    animate({ scene, camera, renderer, particlePositions });

    window.addEventListener("resize", () => handleResize({ camera, renderer }), false)
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
