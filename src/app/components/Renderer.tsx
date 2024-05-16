"use client";
import "../globals.css";
import { Camera } from "@/three/setup/Camera";
import { MainThree } from "@/three/setup/MainThree";
import { useEffect, useState } from "react";
import { useRef } from "react";
import { LoadingAnimation } from "./LoadingAnimation";







const Renderer = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const refLoad = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loading) refLoad.current?.classList.add("hidden");
  }, [loading]);

  const setLoadingHandler = (value: boolean) => setLoading(value);



  useEffect(() => {
    if (MainThree.renderer) return;
    const init = async () => {
      const cam = new Camera();
      MainThree.camera = cam;
      await MainThree.init(setLoadingHandler);

    };

    init();
  }, []);

  return (
    <main className="main">
      <div ref={refLoad} className="loading">
        <h1 className="title">Rock Paper Scissors</h1>
        <LoadingAnimation />
      </div>
      <canvas id="three"></canvas>
      <div className="game-interface">

      </div>
    </main>
  );
};

export default Renderer;
