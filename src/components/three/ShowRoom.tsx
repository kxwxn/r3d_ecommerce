import { CameraControls } from "@react-three/drei";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { FBXLoader, GLTFLoader, OBJLoader } from "three/examples/jsm/Addons.js";

const ShowRoom = () => {
  const { raycaster, camera } = useThree();
  const [isFitting, setIsFitting] = useState(false);

  const gltf = useLoader(GLTFLoader, "./models/custom.glb");

  window.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "a":
        cameraControlsRef.current.setLookAt(-2, 0, 2, 0, 0, 0, true);
        break;
      case "b":
        cameraControlsRef.current.setLookAt(0, 3, 0, 0, 0, 0, true);
        break;
    }
  });

  useEffect(() => {
    cameraControlsRef.current.setTarget(0, 0, 0, false);
  }, []);

  let angle = 0;
  let dis = 2;
  useFrame(() => {
    !isFitting &&
      cameraControlsRef.current.setPosition(
        dis * Math.sin(angle),
        1.5,
        dis * Math.cos(angle)
      );
    angle = angle + 0.005;
  });

  const cameraControlsRef = useRef<CameraControls>(null!);

  const shoesClick = () => {
    const intersects = raycaster.intersectObjects(gltf.scene.children, true);

    if (intersects.length > 0) {
      const firstObj = intersects[0].object as THREE.Mesh;
      const firstMat = firstObj.material as THREE.MeshStandardMaterial;
      const cloneMat = firstMat.clone();

      firstObj.material = cloneMat;
      const mat = firstObj.material as THREE.MeshStandardMaterial;
      mat.color = new THREE.Color("red");

      setIsFitting(true);

      cameraControlsRef.current
        .fitToBox(firstObj, true)
        .then(() => setIsFitting(false));

      // cameraControlsRef.current.setLookAt(
      //   0,
      //   5,
      //   0,
      //   firstObj.position.x,
      //   firstObj.position.y,
      //   firstObj.position.z,
      //   true
      // );
    }
  };

  return (
    <>
      <directionalLight position={[3, 3, 3]} />
      <CameraControls
        ref={cameraControlsRef}
        enabled={true}
        dollyToCursor={true}
        minDistance={0.5}
        maxDistance={10}
        infinityDolly={false}
      />
      <primitive object={gltf.scene} onClick={shoesClick} />
    </>
  );
};

export default ShowRoom;

// .obj 는 .mtl = textures 가 필요하다.
// .fbx 와 .glb(GLTF)는 따로 텍스쳐(머테리얼)이 필요없다.
// const obj = useLoader(OBJLoader, "./models/custom.obj");
// const fbx = useLoader(FBXLoader, "./models/custom.fbx");

{
  /* <primitive object={obj} /> */
}
{
  /* <primitive object={fbx} /> */
}
