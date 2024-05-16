import { ArrayCamera } from "three";
import { Camera } from "./Camera";

export class HandleCameras extends ArrayCamera {
  public cameras: Array<Camera> = [];

  constructor() {
    const cameras = [new Camera(), new Camera()];
    super(cameras);
    this.cameras = cameras;
  }
}
