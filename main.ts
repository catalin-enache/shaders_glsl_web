import * as THREE from 'three';
import { type OrthographicCamera, type Scene, type WebGLRenderer } from 'three';

class SimonDevGLSLCourse {
  private threejs: WebGLRenderer | undefined;
  private scene: Scene | undefined;
  private camera: OrthographicCamera | undefined;
  constructor() {}

  async initialize() {
    this.threejs = new THREE.WebGLRenderer();
    document.body.appendChild(this.threejs.domElement);

    window.addEventListener(
      'resize',
      () => {
        this.onWindowResize();
      },
      false
    );

    this.scene = new THREE.Scene();

    this.camera = new THREE.OrthographicCamera(0, 1, 1, 0, 0.1, 1000);
    this.camera.position.set(0, 0, 1);

    await this.setupProject();

    this.onWindowResize();
    this.raf();
  }

  async setupProject() {
    if (!this.scene) {
      return;
    }
    const vsh = await fetch('./shaders/vertex-shader.glsl');
    const fsh = await fetch('./shaders/fragment-shader.glsl');

    const material = new THREE.ShaderMaterial({
      uniforms: {},
      vertexShader: await vsh.text(),
      fragmentShader: await fsh.text()
    });

    const geometry = new THREE.PlaneGeometry(1, 1);

    const plane = new THREE.Mesh(geometry, material);
    plane.position.set(0.5, 0.5, 0);
    this.scene.add(plane);

    this.onWindowResize();
  }

  onWindowResize() {
    if (!this.threejs) {
      return;
    }
    this.threejs.setSize(window.innerWidth, window.innerHeight);
  }

  raf() {
    requestAnimationFrame((_t) => {
      if (!this.threejs || !this.camera || !this.scene) {
        return;
      }
      this.threejs.render(this.scene, this.camera);
      this.raf();
    });
  }
}

let App = null;

window.addEventListener('DOMContentLoaded', async () => {
  App = new SimonDevGLSLCourse();
  await App.initialize();
});
