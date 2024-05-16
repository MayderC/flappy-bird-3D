import {
  WebGLRenderer,
  PCFSoftShadowMap,
  Scene,
  PlaneGeometry,
  MeshStandardMaterial,
  Mesh,
  Fog,
  AnimationClip,
} from "three";
import { Camera } from "./Camera";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { SetupLights } from "./SetupLights";
import { ANIMATION_NAMES } from "@/game/constants";
import { Bird } from "@/game/objects/Bird";

export class MainThree {
  public static renderer: WebGLRenderer | null = null;
  public static camera: Camera;
  public static animations: Map<ANIMATION_NAMES, AnimationClip> = new Map();
  public static scene: Scene = new Scene();

  private constructor() {}

  public static async init(fn: Function) {
    MainThree.setRender();
    MainThree.onResize();
    if (!MainThree.renderer) return;

    const bird = new Bird(fn, MainThree.scene);
    await bird.loadBird();

    bird.setAnimations();

    MainThree.renderer.shadowMap.enabled = true;
    MainThree.renderer.shadowMap.type = PCFSoftShadowMap;
    MainThree.renderer.setSize(window.innerWidth, window.innerHeight);

    MainThree.camera.position.z = 10;
    MainThree.camera.position.y = 10;
    MainThree.camera.lookAt(0, 0, 0);

    //MainThree.setFog();
    MainThree.setLights();
    MainThree.setPlane();
    MainThree.setOrbitControls();
    MainThree.loop();
  }
  private static setFog() {
    if (!MainThree.renderer) return;
    const fog = new Fog("#ff00ff", 4.5, 12.5);

    MainThree.scene.fog = fog;
    MainThree.renderer.setClearColor(fog.color);
  }

  private static setLights() {
    const lights = SetupLights.getLights();
    MainThree.scene.add(...lights);
  }

  private static setPlane() {
    const planeGeo = new PlaneGeometry(37, 13.5);

    const plane = new Mesh(
      planeGeo,
      new MeshStandardMaterial({ color: 0xffffff })
    );
    plane.rotation.x = (Math.PI / 180) * -90;
    plane.position.y = 0;
    plane.position.z = -5;
    plane.receiveShadow = true;
    MainThree.scene.add(plane);
  }

  private static setOrbitControls() {
    if (!MainThree.renderer) return;

    const controls = new OrbitControls(
      MainThree.camera,
      MainThree.renderer.domElement
    );

    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;
    controls.update();
  }

  private static setRender() {
    MainThree.renderer = new WebGLRenderer({
      antialias: true,
      canvas: document.getElementById("three") as HTMLCanvasElement,
    });
  }

  public static onResize() {
    window.addEventListener("resize", () => {
      if (!MainThree.renderer) return;
      MainThree.renderer.setSize(window.innerWidth, window.innerHeight);
      MainThree.camera.onResize();
    });
  }

  private static loop() {
    requestAnimationFrame(MainThree.loop);
    MainThree.renderer?.render(MainThree.scene, MainThree.camera);
  }
}
