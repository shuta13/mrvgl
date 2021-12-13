import React, { useEffect } from 'react';
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  TorusBufferGeometry,
  MeshStandardMaterial,
  Mesh,
  PointLight,
  PlaneBufferGeometry,
  Color,
  TextureLoader,
  RepeatWrapping,
  Clock,
} from 'three';
import { OrbitControls, Refractor, WaterRefractionShader } from 'three-stdlib';
// import { useControls } from 'leva';

interface HandleResizeParams {
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
}

interface AnimateParams {
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
  refractor: Refractor;
  clock: Clock;
}

const handleResize = ({ camera, renderer }: HandleResizeParams) => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
};

const animate = ({
  scene,
  camera,
  renderer,
  refractor,
  clock,
}: AnimateParams) => {
  window.requestAnimationFrame(() =>
    animate({ scene, camera, renderer, refractor, clock })
  );
  (refractor.material as any).uniforms['time'].value += clock.getDelta();
  renderer.render(scene, camera);
};

// const Leva = () => {
//   // init gui
//   const { speed, factor } = useControls({
//     speed: {
//       value: 1,
//       onChange: (value) => console.log(value),
//     },
//     factor: {
//       value: 1,
//       min: 10,
//       max: 100
//       ,
//   });
//   return (
//     <div>
//       {speed}, {factor}
//     </div>
//   );
// };

const A001: React.FC = () => {
  const onCanvasLoaded = (canvas: HTMLCanvasElement) => {
    if (!canvas) {
      return;
    }

    const scene = new Scene();
    const camera = new PerspectiveCamera(
      45,
      canvas.clientWidth / canvas.clientHeight,
      1,
      1000
    );
    camera.position.set(5, 16, 4.4);
    camera.lookAt(scene.position);

    const geometry = new TorusBufferGeometry(4, 1, 256, 40);
    const material = new MeshStandardMaterial({ color: 0xcccccc });
    material.needsUpdate = false;
    const mesh = new Mesh(geometry, material);
    mesh.rotation.x = 20;
    scene.add(mesh);

    const refractorGeometry = new PlaneBufferGeometry(
      canvas.clientWidth / 4,
      canvas.clientHeight / 4
    );
    const refractor = new Refractor(refractorGeometry, {
      color: new Color(0x7d7d7d),
      textureWidth: 1024,
      textureHeight: 1024,
      shader: WaterRefractionShader,
    });
    refractor.position.set(0, 0, 2.5);
    scene.add(refractor);

    const dudvMap = new TextureLoader().load(
      require('../../../assets/image/waterdudv.jpg'),
      () => {
        animate({ scene, camera, renderer, refractor, clock });
      }
    );
    dudvMap.wrapS = dudvMap.wrapT = RepeatWrapping;
    (refractor.material as any).uniforms['tDudv'].value = dudvMap;

    // const ambientLight = new AmbientLight(0xffffff, 0.2);
    // scene.add(ambientLight);
    const pointLight = new PointLight(0xffffff, 1.2);
    pointLight.position.set(0, 0, 1);
    scene.add(pointLight);

    const clock = new Clock();

    const renderer = new WebGLRenderer({ canvas: canvas, antialias: true });
    renderer.setClearColor('#1d1d1d');
    renderer.setSize(window.innerWidth, window.innerHeight);

    renderer.render(scene, camera);

    if (process.env.NODE_ENV === 'development') {
      new OrbitControls(camera, renderer.domElement);
    }

    animate({ scene, camera, renderer, refractor, clock });

    window.addEventListener(
      'resize',
      () => handleResize({ camera, renderer }),
      false
    );
  };
  useEffect(() => {
    return () => window.removeEventListener('resize', () => handleResize);
  });
  return (
    <>
      <div className="container">
        {/* {process.env.NODE_ENV === 'development' && <Leva />} */}
        <canvas className="canvas" ref={onCanvasLoaded}></canvas>
      </div>
    </>
  );
};

export default A001;
