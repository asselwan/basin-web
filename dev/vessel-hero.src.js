// Basin hero 3D object: the curve-vessel mark, lit and alive. prm_4594c690-0d04-4a04-bac9-a85de3164443
import * as THREE from './three.module.full.js';

function vesselShape() {
  // Derived from the flat logo path M120 130V500H480V130 (stroke-width 42,
  // square caps, miter joins, 600x600 viewBox) expanded into its true filled
  // U cross-section, then centered + y-flipped + scaled by 0.01 for scene units.
  const pts = [
    [99, 109], [99, 521], [501, 521], [501, 109],
    [459, 109], [459, 479], [141, 479], [141, 109],
  ].map(([x, y]) => new THREE.Vector2((x - 300) * 0.01, (300 - y) * 0.01));
  const shape = new THREE.Shape(pts);
  return shape;
}

function buildMesh() {
  const geo = new THREE.ExtrudeGeometry(vesselShape(), { depth: 0.9, bevelEnabled: false });
  geo.translate(0, 0, -0.45);
  geo.computeVertexNormals();
  const mat = new THREE.MeshStandardMaterial({
    color: 0xc4976b,
    metalness: 0.4,
    roughness: 0.32,
    emissive: 0x2a1a0c,
    emissiveIntensity: 0.25,
  });
  return new THREE.Mesh(geo, mat);
}

function init(stage) {
  const canvas = stage.querySelector('canvas.vessel-canvas');
  if (!canvas) return;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  } catch (e) {
    return; // no WebGL: poster stays visible, nothing else to do.
  }
  if (!renderer.getContext()) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 20);
  camera.position.set(0, 0.1, 6.2);
  camera.lookAt(0, 0, 0);

  scene.add(new THREE.AmbientLight(0x241a10, 0.9));
  const key = new THREE.DirectionalLight(0xfff1d8, 2.1);
  key.position.set(3, 4, 5);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xe8734a, 0.6);
  rim.position.set(-4, -1.5, -3);
  scene.add(rim);
  const fill = new THREE.PointLight(0xffe9c9, 0.5, 12);
  fill.position.set(-2, 2, 3);
  scene.add(fill);

  const group = new THREE.Group();
  group.add(buildMesh());
  group.rotation.x = 0.22;
  group.rotation.y = reduceMotion ? 0.55 : -0.3;
  scene.add(group);

  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  function resize() {
    const w = stage.clientWidth || 1;
    const h = stage.clientHeight || 1;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  if ('ResizeObserver' in window) {
    new ResizeObserver(resize).observe(stage);
  } else {
    window.addEventListener('resize', resize);
  }

  renderer.render(scene, camera);
  stage.classList.add('is-ready'); // first frame is up: hide the static poster.

  if (reduceMotion) return; // static render only, no rAF loop, no pointer listener.

  let targetTiltX = 0.22;
  let targetTiltY = -0.3;
  window.addEventListener('pointermove', (ev) => {
    const nx = (ev.clientX / window.innerWidth) * 2 - 1;
    const ny = (ev.clientY / window.innerHeight) * 2 - 1;
    targetTiltY = -0.3 + nx * 0.22;
    targetTiltX = 0.22 - ny * 0.14;
  }, { passive: true });

  let last = performance.now();
  function tick(now) {
    const dt = Math.min((now - last) / 1000, 0.1);
    last = now;
    group.rotation.y += dt * 0.18;
    group.rotation.x += (targetTiltX - group.rotation.x) * 0.04;
    group.rotation.z += (targetTiltY * 0.08 - group.rotation.z) * 0.04;
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

document.querySelectorAll('.vessel-stage').forEach(init);
