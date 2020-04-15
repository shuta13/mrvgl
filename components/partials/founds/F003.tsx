import React from "react";
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  Color,
  TextureLoader,
  RepeatWrapping,
  ShaderMaterial,
  SphereBufferGeometry,
  BufferAttribute,
  Mesh,
  MathUtils,
  Texture
} from "three";
const vert = require("../../../assets/shader/F003/vertex.glsl");
const frag = require("../../../assets/shader/F003/fragment.glsl");

// types

type HandleResizeParams = {
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
};

type AnimateParams = {
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
  sphere: Mesh;
  uniforms: {
    amplitude: {
      value: number
    },
    color: {
      value: Color
    },
    colorTexture: {
      value: Texture
    }
  };
  displacement: Float32Array;
  noise: Float32Array;
};

//

const handleResize = ({ scene, camera, renderer }: HandleResizeParams) => {
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
  sphere,
  uniforms,
  displacement,
  noise,
}: AnimateParams) => {
  window.requestAnimationFrame(() =>
    animate({ scene, camera, renderer, sphere, uniforms, displacement, noise })
  );
  sphere.rotation.y = sphere.rotation.z = performance.now() * 0.0001;
  uniforms.amplitude.value = 2.5 * Math.sin(sphere.rotation.y * 0.125)
  uniforms.color.value.offsetHSL(0.0005, 0, 0)

  for(let i = 0; i < displacement.length; i++) {
    displacement[i] = Math.sin(0.1 * i + performance.now() * 0.01)
    noise[i] += 0.5 * (0.5 - Math.random())
    noise[i] = MathUtils.clamp(noise[i], -5, 5)
    displacement[i] += noise[i]
  }

  (sphere.geometry as any).attributes.displacement.needsUpdate = true;

  renderer.render(scene, camera);
};

const F003: React.FC = () => {
  const onCanvasLoaded = (canvas: HTMLCanvasElement) => {
    if (!canvas) {
      return;
    }
    const scene = new Scene();
    const camera = new PerspectiveCamera(
      30,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    camera.position.z = 300;

    const uniforms = {
      amplitude: {
        value: 1.0,
      },
      color: {
        value: new Color(0xff2200),
      },
      colorTexture: {
        value: new TextureLoader().load(
          require("../../../assets/image/water.jpg")
        ),
      },
    };
    uniforms.colorTexture.value.wrapS = uniforms.colorTexture.value.wrapT = RepeatWrapping;

    const shaderMaterial = new ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vert.default,
      fragmentShader: frag.default,
    });

    const radius = 50;
    const segments = 128;
    const rings = 64;

    const geometry = new SphereBufferGeometry(radius, segments, rings);
    const displacement = new Float32Array(geometry.attributes.position.count);
    const noise = new Float32Array(geometry.attributes.position.count);
    for (let i = 0; i < displacement.length; i++) {
      noise[i] = Math.random() * 5;
    }
    geometry.setAttribute("displacement", new BufferAttribute(displacement, 1));

    const sphere = new Mesh(geometry, shaderMaterial);
    scene.add(sphere);

    const renderer = new WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor("#1d1d1d");
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);

    animate({ scene, camera, renderer, sphere, uniforms, displacement, noise });

    window.addEventListener("resize", () =>
      handleResize({ scene, camera, renderer })
    );
  };
  return (
    <div className="container">
      <canvas className="canvas" ref={onCanvasLoaded} />
    </div>
  );
};

export default F003;
