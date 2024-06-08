import { MainThree } from "@/three/setup/MainThree";
import * as THREE from "three";

const WIDTH = 27;
const SEGMENTS = 9;

export const testCube = () => {
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);

  cube.scale.set(1, 1, 1);

  cube.position.x = -(WIDTH / SEGMENTS) * 4;

  return cube;
};

export const createPlane = (pos: number = 0) => {
  // const geometry = new THREE.PlaneGeometry(WIDTH, WIDTH / 2, 1, 1);

  // const material = new THREE.MeshBasicMaterial({
  //   color: "#ff00ff",
  //   side: THREE.DoubleSide,
  // });

  // const plane = new THREE.Mesh(geometry, material);

  const plane = new THREE.GridHelper(WIDTH, SEGMENTS, 0x0000ff, 0x808080);

  plane.rotation.x = (Math.PI / 180) * 1;
  plane.position.x = WIDTH * pos;

  const clock = new THREE.Clock();
  let animationFrameId: number;
  const animate = () => {
    plane.position.x -= clock.getDelta() * 4;
    animationFrameId = requestAnimationFrame(animate);

    if (plane.position.x < -WIDTH) {
      cancelAnimationFrame(animationFrameId);
      const planeDeletedEvent = new CustomEvent("planeDeleted", {
        detail: { plane: plane },
      });
      document.dispatchEvent(planeDeletedEvent);
    }
  };

  animate();

  return plane;
};
