import { Clock, OrthographicCamera, Scene, WebGLRenderer } from "three";

export interface CreateTextureParams {
  textureWidth: number;
  textureHeight: number;
  dpr: number;
}

export interface UpdateParams<T> {
  scene: Scene;
  camera: OrthographicCamera;
  renderer: WebGLRenderer;
  uniforms: T;
  clock: Clock;
}
