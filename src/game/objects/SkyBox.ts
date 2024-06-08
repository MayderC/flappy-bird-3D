import { Loader } from "@/three/setup/Loader";
import { Scene } from "@/three/setup/Scene";
import { Object3D, Clock } from "three";

export class SkyBox {
  private loader: Loader;
  private model: Object3D | null = null;
  private scene: Scene;

  constructor(fn: Function, scene: Scene) {
    this.loader = Loader.getInstance(fn);
    this.scene = scene;
  }

  private animate() {
    if (!this.model) return;

    const clock = new Clock();

    const loop = () => {
      const delta = clock.getDelta();
      if (this.model) {
        this.model.rotation.y += delta * 0.015;
      }
      requestAnimationFrame(loop);
    };

    loop();
  }

  public async loadSkyBox() {
    if (this.model) return this.model;
    console.log("Loading model");
    const model = await this.loader.loadAsync("/sky.glb");
    model.scene.rotateY(Math.PI);
    this.model = model.scene;
    this.scene.add(model.scene);
    this.animate();
  }
}
