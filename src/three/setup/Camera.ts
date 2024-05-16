import { PerspectiveCamera } from "three";

export class Camera extends PerspectiveCamera {
  constructor() {
    super(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  }

  public onResize() {
    this.aspect = window.innerWidth / window.innerHeight;
    this.updateProjectionMatrix();
  }
}
