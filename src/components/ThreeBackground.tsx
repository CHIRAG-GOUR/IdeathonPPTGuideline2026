"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Renderer with transparent background — NO black fill
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, premultipliedAlpha: false });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    mountRef.current.appendChild(renderer.domElement);

    // Scene — NO background, NO environment (removes the dark room)
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 500);
    camera.position.z = 5;

    const mouseTarget = new THREE.Vector2(0.5, 0.5);
    const mouse = new THREE.Vector2(0.5, 0.5);
    const resolution = new THREE.Vector2(window.innerWidth, window.innerHeight);

    const handlePointerMove = (e: PointerEvent) => {
      mouseTarget.set(
        e.clientX / window.innerWidth,
        1 - (e.clientY / window.innerHeight)
      );
    };

    window.addEventListener("pointermove", handlePointerMove);

    // Smoke-only shader plane — NO tetrahedron mesh
    const geo = new THREE.PlaneGeometry(1, 1);
    const mat = new THREE.ShaderMaterial({
      transparent: true,   // CRITICAL: enables alpha blending
      depthTest: false,
      depthWrite: false,
      blending: THREE.NormalBlending,
      uniforms: {
        up: { value: new THREE.Vector3(0, 1, 0) },
        time: { value: 0 },
        uMouse: { value: mouse },
        uResolution: { value: resolution }
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        varying vec2 vUv;
        void main() {
            vUv = uv;
            vec4 worldPosition = modelMatrix * vec4(position, 1.0);
            vWorldPosition = worldPosition.xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            gl_Position.z = gl_Position.w;
        }
      `,
      fragmentShader: `
        uniform vec3 up;
        uniform float time;
        uniform vec2 uResolution;

        varying vec3 vWorldPosition;
        varying vec2 vUv;

        vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
        vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}

        float snoise(vec3 v){ 
          const vec2 C = vec2(1.0/6.0, 1.0/3.0);
          const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

          vec3 i  = floor(v + dot(v, C.yyy));
          vec3 x0 = v - i + dot(i, C.xxx);

          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min(g.xyz, l.zxy);
          vec3 i2 = max(g.xyz, l.zxy);

          vec3 x1 = x0 - i1 + 1.0 * C.xxx;
          vec3 x2 = x0 - i2 + 2.0 * C.xxx;
          vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

          i = mod(i, 289.0);
          vec4 p = permute(permute(permute(
                     i.z + vec4(0.0, i1.z, i2.z, 1.0))
                   + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                   + i.x + vec4(0.0, i1.x, i2.x, 1.0));

          float n_ = 1.0/7.0;
          vec3 ns = n_ * D.wyz - D.xzx;

          vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_);

          vec4 x = x_ * ns.x + ns.yyyy;
          vec4 y = y_ * ns.x + ns.yyyy;
          vec4 h = 1.0 - abs(x) - abs(y);

          vec4 b0 = vec4(x.xy, y.xy);
          vec4 b1 = vec4(x.zw, y.zw);

          vec4 s0 = floor(b0) * 2.0 + 1.0;
          vec4 s1 = floor(b1) * 2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));

          vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
          vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

          vec3 p0 = vec3(a0.xy, h.x);
          vec3 p1 = vec3(a0.zw, h.y);
          vec3 p2 = vec3(a1.xy, h.z);
          vec3 p3 = vec3(a1.zw, h.w);

          vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
          p0 *= norm.x;
          p1 *= norm.y;
          p2 *= norm.z;
          p3 *= norm.w;

          vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
          m = m * m;
          return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
        }

        #define OCTAVES 8

        float fbm(vec3 direction) {
            float value = 0.0;
            float amplitude = 0.5;
            for (int i = 0; i < OCTAVES; i++) {
                value += amplitude * snoise(direction);
                direction *= 2.0;
                amplitude *= 0.5;
            }
            return value;
        }

        #define PI 3.1415926
        #define HP (PI * 0.5)

        void main() {
          // Gold-tinted smoke, no solid background
          vec3 smokeCol = vec3(0.85, 0.65, 0.13); // warm gold

          vec3 direction = normalize(vWorldPosition - cameraPosition);
          float zenithAngle = acos(dot(up, direction));

          direction.xz += time * 0.00005;

          float intensity = smoothstep(HP - 0.7, HP + 0.4, zenithAngle);
          vec3 smokeDir = up * time * -0.0001;
          float noise = (fbm(direction + smokeDir) * 0.5 + 0.5) * intensity;

          // Only the smoke is visible; where there is no smoke, alpha = 0 (fully transparent)
          float smokeDensity = smoothstep(0.125, 1.0, noise);

          gl_FragColor = vec4(smokeCol, smokeDensity * 0.6);
        }
      `
    });

    const plane = new THREE.Mesh(geo, mat);
    plane.position.z = -100;
    plane.scale.setScalar(100);
    camera.add(plane);
    scene.add(camera);

    // NO tetrahedron mesh — only the smoke plane

    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      resolution.set(window.innerWidth, window.innerHeight);

      const ar = resolution.x / resolution.y;
      camera.aspect = ar;
      camera.updateProjectionMatrix();

      plane.scale.set(ar, 1.0, 1.0);
      plane.scale.multiplyScalar(100);
    };

    resize();
    window.addEventListener("resize", resize);

    const seed = Math.random() * 360000;
    const fps = 1000 / 60;
    let lastFrame = performance.now();
    let animationId: number;

    const animate = () => {
      const now = performance.now();
      const elapsed = now - lastFrame;
      const frameTime = fps / (elapsed || 1);
      lastFrame = now;

      mouse.lerp(mouseTarget, 0.05 / frameTime);

      const time = performance.now() + seed;
      mat.uniforms.time.value = time;

      camera.position.x = Math.cos((mouse.x - 0.5) * Math.PI * 0.25) * 5.0;
      camera.position.y = Math.sin(-(mouse.y - 0.5) * Math.PI * 0.25) * 5.0;
      camera.position.z = Math.sin((mouse.x - 0.5) * Math.PI * 0.25) * 5.0;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);

      if (mountRef.current && mountRef.current.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }

      renderer.dispose();
      geo.dispose();
      mat.dispose();
    };
  }, []);

  return <div ref={mountRef} className="fixed inset-0 z-[5] pointer-events-none" />;
}
