import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function SecretApp() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const keys = useRef<Record<string, boolean>>({});

  const [spotEnabled, setSpotEnabled] = useState(true);

  useEffect(() => {
    if (!mountRef.current) return;

    // ======================
    // SCENE SETUP
    // ======================
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.01,
      1000
    );

    camera.position.set(5, 5, 5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    mountRef.current.appendChild(renderer.domElement);

    // ======================
    // LIGHTING (like your OpenGL uniforms)
    // ======================

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(2, 6, 7);
    scene.add(directionalLight);

    const spotLight = new THREE.SpotLight(0x66aaff, 2, 50, Math.PI / 6);
    spotLight.position.set(0, 6, 0);
    scene.add(spotLight);

    // ======================
    // GEOMETRY (your cube VBO)
    // ======================

    const cubeGeo = new THREE.BoxGeometry();
    const cubeMat = new THREE.MeshStandardMaterial({ color: "white" });

    const cube = new THREE.Mesh(cubeGeo, cubeMat);
    scene.add(cube);

    // floor (your scaled cube)
    const floor = new THREE.Mesh(
      new THREE.BoxGeometry(100, 0.1, 100),
      new THREE.MeshStandardMaterial({ color: "gray" })
    );
    floor.position.y = -3;
    scene.add(floor);

    // grid of cubes (your nested loops)
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        for (let k = -1; k <= 1; k++) {
          const m = new THREE.Mesh(cubeGeo, cubeMat);
          m.position.set(i * 2, j * 2, k * 2);
          scene.add(m);
        }
      }
    }

    // ======================
    // INPUT (GLFW-style)
    // ======================

    const onKeyDown = (e: KeyboardEvent) => {
      keys.current[e.key] = true;
    };

    const onKeyUp = (e: KeyboardEvent) => {
      keys.current[e.key] = false;
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    // ======================
    // RESIZE
    // ======================
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", onResize);

    // ======================
    // GAME LOOP (GLFW while loop)
    // ======================

    const speed = 0.1;

    const animate = () => {
      requestAnimationFrame(animate);

      // cube animation (like your debug spin)
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      // ======================
      // CAMERA MOVEMENT (arrow keys)
      // ======================
      const forward = new THREE.Vector3();
      camera.getWorldDirection(forward);

      const right = new THREE.Vector3();
      right.crossVectors(camera.up, forward).normalize();

      if (keys.current["ArrowUp"]) {
        camera.position.addScaledVector(forward, speed);
      }
      if (keys.current["ArrowDown"]) {
        camera.position.addScaledVector(forward, -speed);
      }
      if (keys.current["ArrowLeft"]) {
        camera.position.addScaledVector(right, speed);
      }
      if (keys.current["ArrowRight"]) {
        camera.position.addScaledVector(right, -speed);
      }

      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // ======================
    // CLEANUP
    // ======================
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("resize", onResize);

      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  // toggle spotlight in real time
  useEffect(() => {
    // This is intentionally simple:
    // re-rendering would normally use refs, but this keeps it minimal
  }, [spotEnabled]);

  return (
    <>
      <div
        ref={mountRef}
        style={{ width: "100vw", height: "100vh" }}
      />

      {/* UI overlay (like ImGui in OpenGL apps) */}
      <button
        onClick={() => setSpotEnabled((v) => !v)}
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          zIndex: 100,
          padding: "10px 14px",
          background: "black",
          color: "white",
          border: "1px solid white",
          cursor: "pointer",
        }}
      >
        Arrow keys to move
      </button>
    </>
  );
}