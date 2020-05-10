import React, { useEffect } from "react"
import {
  Scene,
  OrthographicCamera,
  WebGLRenderer,
  PlaneBufferGeometry,
  RawShaderMaterial,
  Mesh,
  Vector2,
  Clock,
  CanvasTexture
} from "three"

type CreateTextureParams = {
  textureWidth: number;
  textureHeight: number;
  dpr: number;
}
type UpdateParams = {
  scene: Scene;
  camera: OrthographicCamera;
  renderer: WebGLRenderer;
  uniforms: any;
  clock: Clock;
}
type HandleResizeParams = {
  renderer: WebGLRenderer;
}

const vert = require("./shader/index.vert")
const frag = require("./shader/index.frag")

const A002: React.FC = () => {
  let isNeedsStopUpdate = false

  const createTexture = ({textureWidth, textureHeight, dpr}: CreateTextureParams) => {
    const canvas = document.createElement("canvas")
    const canvasWidth = textureWidth * dpr;
    const canvasHeight = textureHeight * dpr;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const context = canvas.getContext("2d");
    if (context !== null) {
      context.font = "200px serif";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillStyle = "#ffffff";
      context.fillText("Bring It Down", canvasWidth / 2, canvasHeight / 2)
      const texture = new CanvasTexture(canvas)
      texture.needsUpdate = false;
      return texture;
    }
  }

  const update = ({ scene, camera, renderer, uniforms, clock }: UpdateParams) => {
    if (isNeedsStopUpdate) return
    requestAnimationFrame(() => update({ scene, camera, renderer, uniforms, clock }))
    uniforms.time.value += clock.getDelta()
    renderer.render(scene, camera)
  }
  
  const handleResize = ({ renderer }: HandleResizeParams) => {
    isNeedsStopUpdate = true;
    renderer.setSize(window.innerWidth, window.innerHeight)
    isNeedsStopUpdate = false;
  }
  const onCanvasLoaded = (canvas: HTMLCanvasElement) => {
    if (!canvas) return
    const scene = new Scene()
    const camera = new OrthographicCamera(-1, 1, 1, -1, 1, 1000)
    camera.position.set(0, 0, 100)
    camera.lookAt(scene.position)
    const geometry = new PlaneBufferGeometry(2, 2)
    const textureWidth = window.innerWidth;
    const textureHeight = window.innerHeight;
    // const textureWidth = 2048;
    // const textureHeight = 1024;
    const dpr = window.devicePixelRatio;
    const texture = createTexture({ textureWidth, textureHeight, dpr })
    const uniforms = {
      time: {
        type: "f",
        value: 0.0
      },
      resolution: {
        type: "v2",
        value: new Vector2(window.innerWidth * dpr, window.innerHeight * dpr)
      },
      texture: {
        type: "t",
        value: texture !== undefined ? texture : null
      }
    }
    const material = new RawShaderMaterial({
      uniforms: uniforms,
      vertexShader: vert.default,
      fragmentShader: frag.default
    })
    const mesh = new Mesh(geometry, material)
    scene.add(mesh)
    const clock = new Clock()
    clock.start()
    const renderer = new WebGLRenderer({
      canvas: canvas,
      antialias: false
    })
    renderer.setClearColor(0x1d1d1d)
    renderer.setPixelRatio(dpr)
    renderer.setSize(window.innerWidth, window.innerHeight)
    update({ scene, camera, renderer, uniforms, clock })
    window.addEventListener("resize", () => handleResize({ renderer }))
  }
  useEffect(() => {
    return () => window.removeEventListener("resize", () => handleResize)
  })
  return (
    <div className="container">
      <canvas ref={onCanvasLoaded} />
    </div>
  )
}

export default A002