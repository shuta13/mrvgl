import { Camera, Clock, OrthographicCamera, Scene, WebGLRenderer } from "three";

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

export interface HandleResizeParams<T> {
  scene: Scene;
  camera: Camera;
  renderer: WebGLRenderer;
  uniforms: T;
}
