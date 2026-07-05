"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const textureSources = [
  "/projects/kallin/website.png",
  "/projects/vulntriage/dashboard.png",
  "/projects/oakland-diner/website.png",
  "/projects/mymoveadvisor/dashboard.jpeg",
  "/projects/kodensoft/website.png",
  "/projects/vulntriage/ai-briefing.png",
  "/projects/kallin/app-02.webp",
];

export function ThreePortfolioScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;

    if (!mount) {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const pointer = new THREE.Vector2(0, 0);
    const targetRotation = new THREE.Vector2(0, 0);
    const clock = new THREE.Clock();
    const loader = new THREE.TextureLoader();

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.9);
    scene.add(ambientLight);

    const keyLight = new THREE.PointLight(0xffffff, 9, 16);
    keyLight.position.set(2, 3, 4);
    scene.add(keyLight);

    const planePositions = [
      { position: new THREE.Vector3(1.85, 0.72, 0), rotation: new THREE.Euler(-0.08, -0.22, 0.08), scale: [2.9, 1.76] },
      { position: new THREE.Vector3(0.15, -1.08, 0.74), rotation: new THREE.Euler(0.05, 0.28, -0.12), scale: [2.25, 1.38] },
      { position: new THREE.Vector3(2.45, -1.78, 1.1), rotation: new THREE.Euler(0.16, -0.16, 0.12), scale: [1.65, 1.02] },
      { position: new THREE.Vector3(-1.15, 1.15, 1.24), rotation: new THREE.Euler(-0.12, 0.18, -0.18), scale: [1.62, 1] },
      { position: new THREE.Vector3(2.95, 1.52, 1.34), rotation: new THREE.Euler(-0.08, -0.28, 0.2), scale: [1.42, 0.88] },
      { position: new THREE.Vector3(-2.35, 0.18, 1.52), rotation: new THREE.Euler(0.08, 0.32, -0.1), scale: [1.38, 0.86] },
      { position: new THREE.Vector3(-1.62, -1.2, 1.42), rotation: new THREE.Euler(0.12, 0.18, -0.2), scale: [0.72, 1.56] },
    ] as const;

    const planes = textureSources.map((src, index) => {
      const texture = loader.load(src);
      texture.colorSpace = THREE.SRGBColorSpace;

      const geometry = new THREE.PlaneGeometry(1, 1, 18, 18);
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
        transparent: true,
      });
      const mesh = new THREE.Mesh(geometry, material);
      const setup = planePositions[index];
      mesh.position.copy(setup.position);
      mesh.rotation.copy(setup.rotation);
      mesh.scale.set(setup.scale[0], setup.scale[1], 1);
      group.add(mesh);
      return mesh;
    });

    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.18,
      wireframe: true,
    });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(2.25, 0.01, 12, 160), ringMaterial);
    ring.position.set(1.1, -0.1, -0.8);
    ring.rotation.set(0.7, 0.2, -0.55);
    scene.add(ring);

    // ── Wireframe geometric shapes ──────────────────────────────────────────
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.13,
    });

    const ico1 = new THREE.Mesh(new THREE.IcosahedronGeometry(0.72, 0), icoMat);
    ico1.position.set(-2.8, 1.4, -1.2);
    scene.add(ico1);

    const icoMat2 = icoMat.clone();
    icoMat2.opacity = 0.1;
    const ico2 = new THREE.Mesh(new THREE.IcosahedronGeometry(0.42, 1), icoMat2);
    ico2.position.set(3.2, -0.9, 0.6);
    scene.add(ico2);

    const icoMat3 = icoMat.clone();
    icoMat3.opacity = 0.08;
    icoMat3.color.set(0x8888ff);
    const ico3 = new THREE.Mesh(new THREE.IcosahedronGeometry(0.28, 0), icoMat3);
    ico3.position.set(0.6, 2.2, 1.8);
    scene.add(ico3);

    const knotMat = new THREE.MeshBasicMaterial({
      color: 0x9988ff,
      wireframe: true,
      transparent: true,
      opacity: 0.08,
    });
    const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(0.52, 0.13, 80, 12), knotMat);
    knot.position.set(-3.2, -1.6, 0.4);
    scene.add(knot);

    const octMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.07,
    });
    const oct = new THREE.Mesh(new THREE.OctahedronGeometry(0.36, 0), octMat);
    oct.position.set(3.6, 1.8, -0.6);
    scene.add(oct);
    // ────────────────────────────────────────────────────────────────────────

    const particleCount = 180;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let index = 0; index < particleCount; index += 1) {
      particlePositions[index * 3] = (Math.random() - 0.36) * 7;
      particlePositions[index * 3 + 1] = (Math.random() - 0.5) * 5.2;
      particlePositions[index * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particles = new THREE.Points(
      particleGeometry,
      new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.018,
        transparent: true,
        opacity: 0.52,
      })
    );
    scene.add(particles);

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.y = -((event.clientY - rect.top) / rect.height - 0.5) * 2;
      targetRotation.x = pointer.y * 0.16;
      targetRotation.y = pointer.x * 0.24;
    };

    let frameId = 0;
    const animate = () => {
      const elapsed = clock.getElapsedTime();
      group.rotation.x += (targetRotation.x - group.rotation.x) * 0.045;
      group.rotation.y += (targetRotation.y - group.rotation.y) * 0.045;
      group.position.y = Math.sin(elapsed * 0.55) * 0.08;

      planes.forEach((plane, index) => {
        plane.position.y += Math.sin(elapsed * 0.8 + index) * 0.0009;
        plane.rotation.z += Math.sin(elapsed * 0.65 + index) * 0.00055;
      });

      ring.rotation.z = elapsed * 0.08;
      particles.rotation.y = elapsed * 0.025;
      particles.rotation.x = Math.sin(elapsed * 0.12) * 0.05;

      // Animate geometric shapes
      ico1.rotation.x = elapsed * 0.18;
      ico1.rotation.y = elapsed * 0.12;
      ico1.position.y = -2.8 + Math.sin(elapsed * 0.7) * 0.18;

      ico2.rotation.y = elapsed * 0.3;
      ico2.rotation.z = elapsed * 0.2;
      ico2.position.y = -0.9 + Math.sin(elapsed * 0.9 + 1.2) * 0.14;

      ico3.rotation.x = elapsed * 0.22;
      ico3.rotation.z = elapsed * 0.16;

      knot.rotation.x = elapsed * 0.09;
      knot.rotation.y = elapsed * 0.14;

      oct.rotation.x = elapsed * 0.25;
      oct.rotation.y = elapsed * 0.18;
      oct.position.y = 1.8 + Math.sin(elapsed * 0.6 + 2.4) * 0.12;

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(animate);
    };

    resize();
    animate();

    window.addEventListener("resize", resize);
    mount.addEventListener("pointermove", onPointerMove);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      mount.removeEventListener("pointermove", onPointerMove);
      mount.removeChild(renderer.domElement);
      planes.forEach((plane) => {
        plane.geometry.dispose();
        const material = plane.material as THREE.MeshBasicMaterial;
        material.map?.dispose();
        material.dispose();
      });
      ring.geometry.dispose();
      ringMaterial.dispose();
      ico1.geometry.dispose();
      icoMat.dispose();
      ico2.geometry.dispose();
      icoMat2.dispose();
      ico3.geometry.dispose();
      icoMat3.dispose();
      knot.geometry.dispose();
      knotMat.dispose();
      oct.geometry.dispose();
      octMat.dispose();
      particleGeometry.dispose();
      (particles.material as THREE.PointsMaterial).dispose();
      renderer.dispose();
    };
  }, []);

  return <div className="three-hero-scene" ref={mountRef} aria-hidden="true" />;
}
