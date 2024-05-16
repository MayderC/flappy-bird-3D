import { Loader } from "@/three/setup/Loader";
import { Scene } from "@/three/setup/Scene";
import { AnimationClip, Clock, Object3D } from "three";
import { GLTF } from "three/examples/jsm/Addons.js";
import * as THREE from "three";

export class Bird {
  private loader: Loader;
  private model: Object3D | null = null;
  public origin: GLTF | null = null;
  private isShadowCaster: boolean = true;
  private animations: AnimationClip[];
  private scene: Scene;

  constructor(fn: Function, scene: Scene) {
    this.scene = scene;
    this.loader = Loader.getInstance(fn);
    this.animations = [];
  }

  private setShadowCaster() {
    if (!this.model || !this.isShadowCaster) return;
    this.model.traverse((child: any) => {
      child.castShadow = true;
      child.receiveShadow = false;
    });
  }

  public async loadBird(): Promise<Object3D> {
    if (this.model) return this.model;

    console.log("Loading model");
    const model = await this.loader.loadAsync("/bird.glb");

    this.origin = model;
    this.animations = model.animations;
    console.log("Hand model loaded");
    console.log(model.scene);
    console.log(model);
    this.model = model.scene;
    this.model.scale.set(4.5, 4.5, 4.5);
    this.model.rotation.y = Math.PI / 90;
    this.setShadowCaster();

    this.scene.add(this.model);

    return this.model;
  }

  public setAnimations() {
    if (!this.model) return;
    const animations = this.getAnimations();
    const mixer = new THREE.AnimationMixer(this.model);

    const action = mixer.clipAction(animations[0]);

    const clock = new Clock();

    action.play();

    const animate = () => {
      requestAnimationFrame(animate);
      mixer.update(clock.getDelta());
    };

    animate();
  }

  public getAnimations() {
    return this.animations;
  }
}
