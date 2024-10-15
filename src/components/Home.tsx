import { Canvas } from "@react-three/fiber";
import React from "react";
import ShowRoom from "@components/three/ShowRoom";
import { OrbitControls } from "@react-three/drei";

const Home = () => {
  return (
    <>
      <Canvas>
        <axesHelper args={[5]} />
        <gridHelper />
        <ShowRoom />
      </Canvas>
    </>
  );
};

export default Home;
