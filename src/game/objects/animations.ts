import { Object3D } from "three";
import { ANIMATION_NAMES } from "../constants";
import { MainThree } from "@/three/setup/MainThree";
import * as THREE from "three";

export const FlyAnimation = (
  model: Object3D,
  name: ANIMATION_NAMES,
  wait: number = 0,
  cb?: Function
) => {
  const animationClip = MainThree.animations.get(name);

  if (!animationClip || !model) return;

  console.log("Playing animation");
  console.log(animationClip);
  console.log(model);

  const mixer = new THREE.AnimationMixer(model);
  const action = mixer.clipAction(animationClip);
  action.loop = THREE.LoopOnce;
  action.clampWhenFinished = false;

  mixer.addEventListener("finished", () => {
    if (cb) cb();
  });

  action.play();
  const clock = new THREE.Clock();
  const animate = () => {
    requestAnimationFrame(animate);
    mixer.update(clock.getDelta());
  };

  setTimeout(() => {
    animate();
  }, wait);
};
